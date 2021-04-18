// stringChangeHandler for a blueprintJS text field
export function handleStringChange(handler: (value: string) => void) {
  return (event: React.FormEvent<HTMLElement>) =>
    handler((event.target as HTMLInputElement).value);
}

// This function changes the colour of a div based on a value
export const getChangeClass = (change: number | undefined) => {
  if (change !== undefined && change >= 0.01) {
    return "up";
  }
  if (change !== undefined && change <= -0.01) {
    return "down";
  }
  return "";
};

// BlueprintJS has intents for tags and buttons, this function changes the colour
// of the button based on a value
export const getChangeIntent = (change: number | undefined) => {
  if (change !== undefined && change >= 0.01) {
    return "success";
  }
  if (change !== undefined && change <= -0.01) {
    return "danger";
  }
  return "none";
};
