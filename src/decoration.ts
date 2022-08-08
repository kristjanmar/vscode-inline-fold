import { DecorationInstanceRenderOptions, DecorationOptions, DecorationRangeBehavior, DecorationRenderOptions, Range, TextEditorDecorationType, window } from "vscode";
import { ExtensionConfigs } from "./config";
import { Configs } from "./enums";

/**
 * With each time the decorator is triggered, and the method setDecoration is called,
 * The extension will create a new decoration type with sequential numbers. This will
 * Create large number of decoration types which will overlapse each other.
 * This class DecoratorTypeOptions is used to cache the decoration type for each trigger
 * To only have single applied set of decoration type per language id.
 * on demand.
 */
export class DecoratorTypeOptions {
  private cache = new Map<string, TextEditorDecorationType>();
  private lineChahe: string[];

  public ClearCache() {
    this.cache.clear();
    delete this.lineChahe;
  }

  public UnfoldedDecorationType = (langId: string /* To use later for lang scoped configs */): DecorationRenderOptions => {
    return {
      rangeBehavior: DecorationRangeBehavior.ClosedClosed,
      opacity: ExtensionConfigs.get<string>(Configs.unfoldedOpacity).toString()
    }
  }

  public MatchedDecorationType = (langId: string /* To use later for lang scoped configs */): DecorationRenderOptions => {
    return {
      before: {
        contentText: ExtensionConfigs.get<string>(Configs.maskChar),
        color: ExtensionConfigs.get<string>(Configs.maskColor),
      },
      after: {
        contentText: ExtensionConfigs.get<string>(Configs.after)
      },
      letterSpacing: "-2ch",
      textDecoration: "none; display: none;"
    }
  };

  public UnfoldDecorationTypeCache(langId: string): TextEditorDecorationType {
    return this.cache.has(langId) ? this.cache.get(langId) as TextEditorDecorationType :
      this.cache.set(langId, window.createTextEditorDecorationType(this.UnfoldedDecorationType(langId)))
        .get(langId);
  }

  public MaskDecorationTypeCache(langId: string): TextEditorDecorationType {
    return this.cache.has(langId) ? this.cache.get(langId) as TextEditorDecorationType :
      this.cache.set(langId, window.createTextEditorDecorationType(this.MatchedDecorationType(langId)))
        .get(langId);
  }

  public PlainDecorationTypeCache(langId: string): TextEditorDecorationType {
    return this.cache.has(langId) ? this.cache.get(langId) as TextEditorDecorationType: 
      this.cache.set(langId, window.createTextEditorDecorationType(this.PlainDecorationType()))
        .get(langId);
  }

  public MatchedDecorationOptions = (range: Range, _languageId: string): DecorationOptions => {
    const configs = ExtensionConfigs.get<DecorationInstanceRenderOptions>(Configs.perLanguageOptions);
    return {
      range,
      renderOptions: configs
    }
  }

  public UnfoldedDecorationOptions = (range: Range, text: string): DecorationOptions => {
    return {
      range,
      hoverMessage: `Full text: ${text}`,
    }
  }

  public PlainDecorationType = (): DecorationRenderOptions => {
    return { rangeBehavior: DecorationRangeBehavior.ClosedClosed }
  }

  constructor () { }

}