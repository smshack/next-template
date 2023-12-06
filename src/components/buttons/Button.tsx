import { ButtonProps } from '@/types/Buttons';
export default function Button({
  content,
  width,
  height,  
  ...props

}: ButtonProps) {
  return (
    <button
      className={`${width} ${height} p-1 rounded-md text-white bg-blue-500 `}
      {...props}>
      {content}
    </button>
  );
}
