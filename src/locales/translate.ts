import { MessageName } from './message';

type TranslateFunc = {
  (locateMessageKey: MessageName): string;
  (locateMessageKey: MessageName, ...substitutions: readonly string[]): string;
};

export const translate: TranslateFunc = (
  messageName: MessageName,
  ...substitutions: readonly string[]
): string => {
  return chrome.i18n.getMessage(
    messageName,
    substitutions as string | string[] | undefined,
  );
};
