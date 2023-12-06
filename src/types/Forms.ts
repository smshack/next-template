
export interface InputLabelProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "placeholder"> {
  label?: string;
  id: string;
  type: string;
}