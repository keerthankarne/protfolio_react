import smoke from "../assets/smoke-red.jpeg";
import "./MaskedText.css";

export default function MaskedText({ text, as: Tag = "span", className = "" }) {
  return (
    <Tag
      className={`masked-text ${className}`}
      style={{ backgroundImage: `url(${smoke})` }}
    >
      {text}
    </Tag>
  );
}
