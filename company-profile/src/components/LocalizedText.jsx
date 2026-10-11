import { useLanguage } from "../context/useLanguage";

export default function LocalizedText({ as: Tag = "span", children, ...props }) {
  const { t } = useLanguage();
  return <Tag {...props}>{t(children)}</Tag>;
}
