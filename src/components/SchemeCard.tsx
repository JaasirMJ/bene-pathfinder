import { Link } from "react-router-dom";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ArrowRight, MapPin, Building2, Bookmark } from "lucide-react";
import { cn } from "@/lib/utils";
import { EligibilityTags } from "@/components/EligibilityTags";
import { SchemeTypeBadge, SchemeImportanceBadge } from "@/components/SchemeTypeBadge";
import { useBookmarks } from "@/hooks/useBookmarks";
import { useRecentlyViewed } from "@/hooks/useRecentlyViewed";
import type { Scheme } from "@/data/mockData";

interface SchemeCardProps {
  scheme: Scheme;
  onClick?: () => void;
  showScore?: boolean;
}

export const SchemeCard = ({ scheme, onClick, showScore = true }: SchemeCardProps) => {
  const { toggleBookmark, isBookmarked } = useBookmarks();
  const { addToRecent } = useRecentlyViewed();
  const saved = isBookmarked(scheme.id);

  const allMatch = scheme.ruleMatches
    ? Object.values(scheme.ruleMatches).every(Boolean)
    : false;

  return (
    <div 
      className="card-interactive p-6 h-full flex flex-col"
      onClick={onClick}
    >
      {/* Header */}
      <div className="flex items-start justify-between gap-2 mb-3">
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-2 flex-wrap">
            <Badge variant={scheme.type === 'central' ? 'central' : 'state'}>
              {scheme.type === 'central' ? 'Central' : 'State'}
            </Badge>
            <Badge variant="category" className="gap-1">
              <SchemeTypeBadge category={scheme.category} />
              {scheme.category}
            </Badge>
          </div>
          <h3 className="text-lg font-semibold text-foreground line-clamp-2">
            {scheme.title}
          </h3>
        </div>
        
        <div className="flex flex-col items-center gap-1">
          <button
            onClick={(e) => {
              e.stopPropagation();
              toggleBookmark(scheme.id);
            }}
            className={cn(
              "p-1.5 rounded-md transition-colors",
              saved ? "text-warning" : "text-muted-foreground hover:text-warning"
            )}
            aria-label={saved ? "Remove bookmark" : "Save for later"}
          >
            <Bookmark className={cn("h-5 w-5", saved && "fill-current")} />
          </button>

          {showScore && scheme.ruleMatches && (
            <span
              className={cn(
                "text-xs font-bold px-2 py-0.5 rounded-full",
                allMatch
                  ? "bg-success/10 text-success"
                  : "bg-destructive/10 text-destructive"
              )}
            >
              {allMatch ? "YES" : "NO"}
            </span>
          )}
        </div>
      </div>

      {/* Importance Badge */}
      <div className="mb-2">
        <SchemeImportanceBadge category={scheme.category} />
      </div>

      {/* Description */}
      <p className="text-sm text-muted-foreground line-clamp-2 mb-3 flex-1">
        {scheme.description}
      </p>

      {/* Eligibility Tags */}
      {scheme.ruleMatches && (
        <div className="mb-3">
          <EligibilityTags ruleMatches={scheme.ruleMatches} />
        </div>
      )}

      {/* Meta info */}
      <div className="flex items-center gap-4 text-sm text-muted-foreground mb-3">
        <div className="flex items-center gap-1">
          <Building2 className="h-4 w-4" />
          <span className="truncate max-w-[150px]">{scheme.ministry}</span>
        </div>
        {scheme.state && (
          <div className="flex items-center gap-1">
            <MapPin className="h-4 w-4" />
            <span>{scheme.state}</span>
          </div>
        )}
      </div>

      {/* Benefits */}
      <div className="bg-success/5 border border-success/20 rounded-lg p-3 mb-4">
        <span className="text-xs font-medium text-success">Benefits</span>
        <p className="text-sm font-semibold text-foreground">{scheme.benefits}</p>
      </div>

      {/* Action */}
      <Link to={`/scheme/${scheme.id}`} onClick={() => addToRecent(scheme.id)}>
        <Button variant="accent-outline" className="w-full group">
          View Details
          <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
        </Button>
      </Link>
    </div>
  );
};
