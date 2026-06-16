import formStyles from "./admin-forms.module.scss";

interface SaveBarProps {
  onSave: () => void;
  saving: boolean;
  label?: string;
}

export default function SaveBar({
  onSave,
  saving,
  label = "שמירה",
}: SaveBarProps) {
  return (
    <div className={formStyles.saveBar}>
      <button
        type="button"
        className={formStyles.saveBtn}
        onClick={onSave}
        disabled={saving}
      >
        {saving ? "שומר..." : label}
      </button>
    </div>
  );
}
