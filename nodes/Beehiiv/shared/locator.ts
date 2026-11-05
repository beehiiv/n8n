export function locatorValue(value: unknown): string {
   if (typeof value === 'string') {
      return value;
   }

   if (value && typeof value === 'object' && 'value' in value) {
      const nested = (value as { value: unknown }).value;
      return typeof nested === 'string' ? nested : '';
   }

   return '';
}
