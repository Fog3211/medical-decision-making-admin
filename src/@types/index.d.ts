
declare module '*.png' {
  const value: string
  export = value
}

declare module '*.less' {
  const styles: Record<string, string>;
  export = styles;
}