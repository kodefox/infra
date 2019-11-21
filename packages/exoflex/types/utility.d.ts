import { ComponentPropsWithRef } from 'react';

declare global {
  type OmitPaperTheme<T> = Omit<ComponentPropsWithRef<T>, 'theme'>;
}
