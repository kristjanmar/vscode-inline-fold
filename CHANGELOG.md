## Change log:

### 0.2.0:
    - Added: support for language scoped settings.
    - Added: custom cache for the decorations per languageid (to avoid re-rendering the decorations when the language changes).
    - Fixed: [#23](https://github.com/moalamri/vscode-inline-fold/issues/23)
    - Exposed some DecorationInstanceRenderOptions to allow for customizating the decoration.

### 0.1.4:
    - fixed [#19](https://github.com/moalamri/vscode-inline-fold/issues/19)
    - fixed [#17](https://github.com/moalamri/vscode-inline-fold/issues/17)
    - optimized events debouncing.

### 0.1.2:
    - fixed [#17](https://github.com/moalamri/vscode-inline-fold/issues/17)

### 0.1.1:
    - (hotfix) Fixed issue that could cause the extension to crash.

### 0.1.0
    - Added offsets to the visible part of the editor.
    - Registered toggle command (#1)
    - Changed default regex to support react.
    - Unfold selected lines.
    - Fixed: multi cursor selection doesn't unfold text (#6)
    - Support for react out of the box (#9) (#10) (#12)
    - Fixed support for files with lines lower than visiual range

### 0.0.8
    - perf: ⚡ New approach to boost performance #2

### 0.0.7
    - Working version