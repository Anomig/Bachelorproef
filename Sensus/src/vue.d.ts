// Type declaration zodat TypeScript `.vue` imports correct kan typen.
declare module '*.vue' {
  import type { DefineComponent } from 'vue'
  const component: DefineComponent<{}, {}, any>
  export default component
}
