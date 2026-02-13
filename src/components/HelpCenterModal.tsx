import { useLanguage } from "@/i18n/LanguageContext";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Users, MapPin, MessageCircle } from "lucide-react";

interface HelpCenterModalProps {
  open: boolean;
  onClose: () => void;
  onOpenChat?: () => void;
}

export const HelpCenterModal = ({ open, onClose, onOpenChat }: HelpCenterModalProps) => {
  const { t } = useLanguage();

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>{t("help.title")}</DialogTitle>
        </DialogHeader>

        <div className="space-y-3 mt-4">
          <Button variant="outline" className="w-full justify-start gap-3 h-auto py-4" asChild>
            <Link to="/ngo" onClick={onClose}>
              <Users className="h-5 w-5 text-accent" />
              <div className="text-left">
                <p className="font-medium">{t("help.contactNgo")}</p>
                <p className="text-xs text-muted-foreground">Get help from local NGOs</p>
              </div>
            </Link>
          </Button>

          <Button variant="outline" className="w-full justify-start gap-3 h-auto py-4" asChild>
            <Link to="/office-finder" onClick={onClose}>
              <MapPin className="h-5 w-5 text-info" />
              <div className="text-left">
                <p className="font-medium">{t("help.locateOffice")}</p>
                <p className="text-xs text-muted-foreground">Find government offices nearby</p>
              </div>
            </Link>
          </Button>

          <Button
            variant="outline"
            className="w-full justify-start gap-3 h-auto py-4"
            onClick={() => {
              onClose();
              onOpenChat?.();
            }}
          >
            <MessageCircle className="h-5 w-5 text-success" />
            <div className="text-left">
              <p className="font-medium">{t("help.chatAi")}</p>
              <p className="text-xs text-muted-foreground">Ask anything about schemes</p>
            </div>
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};
