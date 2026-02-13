import { useLanguage } from "@/i18n/LanguageContext";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { AlertTriangle, Upload } from "lucide-react";

interface MissingDocsPopupProps {
  open: boolean;
  onClose: () => void;
  missingDocs: string[];
}

export const MissingDocsPopup = ({ open, onClose, missingDocs }: MissingDocsPopupProps) => {
  const { t } = useLanguage();

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 rounded-full bg-destructive/10 flex items-center justify-center">
              <AlertTriangle className="h-5 w-5 text-destructive" />
            </div>
            <DialogTitle className="text-destructive">{t("docs.missingTitle")}</DialogTitle>
          </div>
          <DialogDescription>{t("docs.missingSubtitle")}</DialogDescription>
        </DialogHeader>

        <div className="space-y-2 my-4">
          {missingDocs.map((doc) => (
            <div key={doc} className="flex items-center gap-2 text-sm text-foreground bg-destructive/5 p-2 rounded-lg">
              <span className="text-destructive font-medium">✖</span>
              {doc}
            </div>
          ))}
        </div>

        <DialogFooter className="gap-2">
          <Button variant="outline" onClick={onClose}>
            {t("docs.cancel")}
          </Button>
          <Link to="/documents-upload">
            <Button className="gap-2">
              <Upload className="h-4 w-4" />
              {t("docs.upload")}
            </Button>
          </Link>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
