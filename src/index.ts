import { ExtensionContext, sources } from "coc.nvim";
import items from "./items.json";

export async function activate(context: ExtensionContext): Promise<void> {
  context.subscriptions.push(
    sources.createSource({
      name: "nerdfont",
      doComplete: async () => {
        return {
          items: items,
        };
      },
    }),
  );
}
