
    (() => {
      'use strict';
      // 数据来源：hero_ability_catalog / hero_card_catalog / skill_catalog / card_rule_definitions。
      // 此文件是展示层，不执行战斗结算；id 保留游戏内标识，方便接入网页逻辑。
      const burnRule = {
        title: '灼烧结算',
        text: '灼烧没有回合期限。每层造成1点灼烧伤害；正常回合末或立即结算后均移除1层，最低归零。灼烧引爆另按卡牌规则造成直接伤害并清空层数。'
      };
      const fieldRule = {
        title: '场地规则',
        text: '场地区最多同时容纳三张具体副本，满位时无法出牌且不扣费。回合结束不弃置，洗牌不包含场地。游戏中左键放大，右键退至弃牌区，仅撤回该副本的持续效果。'
      };
      const cards = [
        {
          id: 'exclusive:burn01', name: '蔓炎', cost: '1 / 2 / 4 / 4 SP', owner: '赤焰', glyph: 'flame',
          lines: ['指定一名带灼烧的敌人', '其灼烧层数翻倍', '费用1/2/4/4，此后均4'],
          description: '第1/2次释放消耗1/2技能点，第三次起均为4。指定一名带灼烧的敌人，使其灼烧层数翻倍。',
          notes: [burnRule, { title: '递增费用', text: '费用按本场成功施放次数计算，同名副本共用次数；卡面与实际扣费使用同一规则，弈者大招不受影响。' }]
        },
        {
          id: 'exclusive:gatherBurn', name: '聚烬', cost: '1 SP', owner: '赤焰', glyph: 'flame',
          lines: ['指定一名存活敌人', '将存活敌人的全部灼烧转移至该目标'],
          description: '消耗1技能点。指定一名存活敌人，将所有存活敌人的灼烧层数转移至该目标；保留其原有层数，不造成伤害或触发灼烧结算。敌方没有灼烧时不可施放。',
          notes: [burnRule, { title: '目标', text: '可选择尚无灼烧的存活敌人。转移保留总层数，不额外造成伤害。' }]
        },
        {
          id: 'free:burnDetonate', name: '灼烧引爆', cost: '2 SP', owner: '通用', glyph: 'flame',
          lines: ['引爆灼烧最多敌人', '每层5伤害并清层', '击杀：余敌均分原层'],
          description: '消耗2技能点。引爆灼烧层数最高的可锁定敌人：每层造成5点直接伤害并清空其灼烧；若引爆击杀，则将原灼烧层均分给其余存活敌人。',
          notes: [burnRule]
        },
        {
          id: 'exclusive:emberStormCard', name: '烈焰风暴', cost: '1 SP', owner: '赤焰', glyph: 'flame',
          lines: ['弃掉其余全部手牌', '每弃1张，灼烧最高敌人+2层', '合并为一次施加'],
          description: '消耗1技能点。丢弃其余全部手牌（包括保留牌），按实际丢弃数量，向灼烧层数最高的存活敌人一次性施加每张2层灼烧；同层数优先槽位靠前者。没有其余手牌也可使用。',
          notes: [burnRule, { title: '主动弃牌', text: '不计正在打出的本牌；保留牌也会弃掉。按实际弃牌张数一次性增加灼烧，所有敌人都为0层时仍选存活目标；同层数按槽位取前者。' }]
        },
        {
          id: 'exclusive:emberImpulse', name: '火花', cost: '1 SP', owner: '赤焰 · 场地', glyph: 'flame',
          lines: ['敌方灼烧变层时', '每次5%：最高攻弈子', '随机攻击敌人1次'],
          description: '消耗1技能点，作为场地留场。敌方单位灼烧层数每次实际变化时，每份火花独立有5%概率令我方攻击最高的存活弈子攻击随机存活可锁定敌人一次。增加、减少、转移均可触发，允许连锁；撤下此牌只移除这一份效果。',
          notes: [burnRule, fieldRule]
        },
        {
          id: 'exclusive:emberArmament', name: '燎兵', cost: '1 SP', owner: '赤焰 · 场地', glyph: 'blade',
          lines: ['场地：我方每次攻击命中存活敌人', '每份附加1层灼烧'],
          description: '消耗1技能点，作为场地留场。我方每次实际攻击命中后，若敌人存活，每份燎兵向其施加1层灼烧。包括反击、追击和火花攻击；撤下此牌只移除这一份效果。',
          notes: [burnRule, fieldRule]
        }
      ];

      // SVG 坐标直接移植自 ui/art/card_illustration.gd，保持原线稿轮廓。
      const glyphs = {
        flame: `<g stroke="#996147">
          <path stroke-width="1.55" d="M0-28 3-15 14-4 19 7 16 18 8 25-5 26-15 21-20 11-17 1-11-17-6-9 0-28"/>
          <path stroke-width="1.25" d="M1 0 8 11 8 18 3 23-4 23-8 18-7 11 1 0"/>
          <path stroke-width=".9" d="M12-22 16-29"/>
        </g>`,
        blade: `<g stroke="#6b5544">
          <path stroke-width="1.5" d="M-7 9 13-25 20-25 19-17 0 14Z"/>
          <path stroke-width="1.6" d="M-14 5 8 20"/>
          <path stroke-width="1.4" d="M-8 13-17 23-10 28-2 18Z"/>
          <path stroke-width=".9" d="M-22-14-29-20 M22-14 29-20 M-22 15-29 21 M22 15 29 21"/>
        </g>`
      };
      function illustration(glyph) {
        return `<svg class="yizhe-card__art" viewBox="-65 -38 130 76" fill="none" aria-hidden="true" focusable="false">
          ${glyphs[glyph] || glyphs.flame}
        </svg>`;
      }
      function element(tag, className, text) {
        const node = document.createElement(tag);
        node.className = className;
        if (text !== undefined) node.textContent = text;
        return node;
      }
      const grid = document.querySelector('.yizhe-cards');
      const dialog = document.querySelector('.yizhe-rules');
      function showRules(card) {
        dialog.querySelector('h2').textContent = card.name;
        dialog.querySelector('.yizhe-rules__meta').textContent = `${card.cost} · ${card.owner}`;
        dialog.querySelector('.yizhe-rules__description').textContent = card.description;
        const notes = dialog.querySelector('.yizhe-rules__notes');
        notes.replaceChildren();
        for (const note of card.notes) {
          notes.append(element('h3', '', note.title), element('p', '', note.text));
        }
        dialog.showModal();
      }
      for (const card of cards) {
        const face = element('button', 'yizhe-card');
        face.type = 'button';
        face.dataset.cardId = card.id;
        face.setAttribute('aria-haspopup', 'dialog');
        face.title = '点击查看完整规则';
        const meta = element('span', 'yizhe-card__meta');
        meta.append(element('span', 'yizhe-card__cost', card.cost), element('span', 'yizhe-card__owner', card.owner));
        face.append(meta, element('span', 'yizhe-card__name', card.name));
        // 仅插入上方固定 SVG 模板；所有卡牌文案使用 textContent。
        face.insertAdjacentHTML('beforeend', illustration(card.glyph));
        const text = element('span', 'yizhe-card__text');
        for (const line of card.lines) text.append(element('span', 'yizhe-card__line', line));
        face.append(text);
        face.append(element('span', 'yizhe-card__hint', '查看规则 ↗'));
        face.addEventListener('click', () => showRules(card));
        grid.append(face);
      }
    })();
  