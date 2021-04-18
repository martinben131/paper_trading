import { Position, Toaster } from "@blueprintjs/core";

// Creates a dropdown toaster to display trade sucess messages
export const AppToaster = Toaster.create({
  className: "recipe-toaster",
  position: Position.TOP,
});
