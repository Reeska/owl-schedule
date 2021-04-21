import { format as fnsFormat } from 'date-fns'
import locales from 'date-fns/locale'

import type { DayNumber } from '../../../types/types'

export interface FormatOptions {
  locale?: Locale;
  weekStartsOn?: DayNumber;
  firstWeekContainsDate?: number;
  useAdditionalWeekYearTokens?: boolean;
  useAdditionalDayOfYearTokens?: boolean;
}

export const format = (
  date: Date | number,
  format: string,
  options?: FormatOptions,
) => (
  fnsFormat(date, format, {
    locale: getBrowserLocale(),
    ...options,
  })
)

const getBrowserLocale = () => {
  for (const lang of navigator.languages) {
    const locale: Locale | undefined = (locales as any)[lang.replace('-', '')]

    if (locale) {
      return locale
    }
  }

  return locales.fr
}
