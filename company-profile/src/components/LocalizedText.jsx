import { cloneElement, isValidElement } from "react";
import { useLanguage } from "../context/useLanguage";

function translateChildren(children, t) {
  if (Array.isArray(children)) {
    return children.map((child) => translateChildren(child, t));
  }

  if (typeof children === "string") {
    const match = children.match(/^(\s*)([\s\S]*?)(\s*)$/);
    return `${match[1]}${t(match[2])}${match[3]}`;
  }

  if (isValidElement(children)) {
    return cloneElement(
      children,
      undefined,
      translateChildren(children.props.children, t)
    );
  }

  return children;
}

export default function LocalizedText({ as: Tag = "span", children, ...props }) {
  const { t } = useLanguage();
  return <Tag {...props}>{translateChildren(children, t)}</Tag>;
}
