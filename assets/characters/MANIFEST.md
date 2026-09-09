# Character asset manifest

## Element Dungeon — protagonist cat

- Current source: `C:\Users\78566\Documents\ChatGPT\元素地牢-godot版\assets\characters\cat\`.
- Verified animation configuration: `resources/animations/player_frames.tres` splits each idle strip into 8 horizontal frames, loops it, and plays at 8 fps. `scripts/player.gd` maps the normal, water, and fire element states to `idle`, `water_idle`, and `fire_idle` respectively.
- Web copies: `cat/cat_idle.png`, `cat/cat_water_idle.png`, and `cat/cat_fire_idle.png`. Each is a transparent 640 × 64 px sheet with 8 horizontal frames of 80 × 64 px. At the source timing, one complete idle loop lasts 1 second.
- Element mapping: `cat_idle.png` is the normal/default form; `cat_water_idle.png` is the water form; `cat_fire_idle.png` is the fire form. These are actual source-project character variants and may be switched directly by the homepage interaction.
- Layout-ready variants: `cat/cat_idle-cropped.png` (232 × 28 px; 8 × 29 × 28 px frames), `cat/cat_water_idle-cropped.png` (240 × 30 px; 8 × 30 × 30 px frames), and `cat/cat_fire_idle-cropped.png` (240 × 30 px; 8 × 30 × 30 px frames). Each uses the union of every frame's opaque pixels, so frame alignment and order are retained while trimming transparent margins. Their pixel-art scale is suitable for a 4× presentation.
- License: `cat/LICENSE.txt` is copied with the assets. It permits use in personal or commercial game projects, modification, and asks that the asset not be resold or redistributed as a standalone game asset. The legacy `element-cat-idle-spritesheet.png` remains in this folder from an earlier project copy; do not use it for the homepage.

## Yizhe — static portraits

The `*-cropped.png` files are lossless transparent crops of the originals' non-transparent pixel bounds. Use them for page layout; un-cropped source copies remain alongside them.

For the page's 235 px-tall desktop portraits, use the `*-web.webp` variants. They are 480 px tall (about 2× the rendered height), preserve alpha (`yuva420p`), and were encoded from the cropped PNGs with WebP quality 90. Visual inspection found no material artefacts at their intended display scale; the original PNGs remain available for future high-resolution use.

| Character | Cropped web file | Crop dimensions | Source |
| --- | --- | --- | --- |
| 宁不凡 | `yizhe-ningbufan-cropped.png` | 968 × 1139 px | `D:\游戏开发\新弈者\Assets\Chessors\Art\characters\ningbufan_lihui_transparent_v2.png` |
| 赤炎 | `yizhe-chiyan-cropped.png` | 861 × 1103 px | `D:\游戏开发\新弈者\Assets\Chessors\Art\characters\chiyan_lihui_transparent_v2.png` |
| 炎术士 | `yizhe-yanshushi-cropped.png` | 715 × 1215 px | `D:\游戏开发\新弈者\Assets\Chessors\Art\characters\yanshushi_lihui_transparent_v2.png` |
| 千机 | `yizhe-qianji-cropped.png` | 1101 × 1186 px | `D:\游戏开发\新弈者\Assets\Chessors\Art\characters\qianji_lihui.png` |

All four originals are transparent 1254 × 1254 px PNGs. The same filenames also exist in `D:\游戏开发\弈者卡牌版\assets\portraits\`; the web copies above were taken from `新弈者`, the user-requested current project.

| Character | WebP file | Dimensions | File size |
| --- | --- | --- | --- |
| 宁不凡 | `yizhe-ningbufan-web.webp` | 408 × 480 px | 46.6 KB |
| 赤炎 | `yizhe-chiyan-web.webp` | 374 × 480 px | 60.3 KB |
| 炎术士 | `yizhe-yanshushi-web.webp` | 282 × 480 px | 56.5 KB |
| 千机 | `yizhe-qianji-web.webp` | 446 × 480 px | 73.9 KB |
