export function camelize(text: string): string {
  return text.replace(/-(\w)/g, (_, c) => c ? c.toUpperCase() : '')
}

// commander passes the Command object itself as options,
// extract only actual options into a fresh object.
export function cleanArgs(cmd: any): any {
  const args = {}
  cmd.options.forEach((o: any) => {
    const key = camelize(o.long.replace(/^--/, ''))
    // if an option is not present and Command has a method with the same name
    // it should not be copied
    if (typeof cmd[key] !== 'function' && typeof cmd[key] !== 'undefined') {
      // @ts-ignore
      args[key] = cmd[key]
    }
  })
  return args
}
