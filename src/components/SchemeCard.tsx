import { Link } from "react-router-dom";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ArrowRight, MapPin, Building2 } from "lucide-react";
import { cn } from "@/lib/utils";
import type { Scheme } from "@/data/mockData";

interface SchemeCardProps {
  scheme: Scheme;
  onClick?: () => void;
  showScore?: boolean;
}

export const SchemeCard = ({ scheme, onClick, showScore = true }: SchemeCardProps) => {
  const score = scheme.aiScore ? Math.round(scheme.aiScore * 100) : null;
  const scoreLevel = score && score >= 80 ? 'high' : score && score >= 50 ? 'medium' : 'low';

  const getScoreVariant = () => {
    switch (scoreLevel) {
      case 'high': return 'score-high' as const;
      case 'medium': return 'score-medium' as const;
      case 'low': return 'score-low' as const;
      default: return 'secondary' as const;
    }
  };

  return (
    <div 
      className="card-interactive p-6 h-full flex flex-col"
      onClick={onClick}
    >
      {/* Header */}
      <div className="flex items-start justify-between gap-4 mb-4">
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-2">
            <Badge variant={scheme.type === 'central' ? 'central' : 'state'}>
              {scheme.type === 'central' ? 'Central' : 'State'}
            </Badge>
            <Badge variant="category">{scheme.category}</Badge>
          </div>
          <h3 className="text-lg font-semibold text-foreground line-clamp-2">
            {scheme.title}
          </h3>
        </div>
        
        {showScore && score !== null && (
          <div className="flex flex-col items-center">
            <Badge variant={getScoreVariant()} className="text-base px-3 py-1">
              {score}%
            </Badge>
            <span className="text-xs text-muted-foreground mt-1">match</span>
          </div>
        )}
      </div>

      {/* Description */}
      <p className="text-sm text-muted-foreground line-clamp-2 mb-4 flex-1">
        {scheme.description}
      </p>

      {/* Meta info */}
      <div className="flex items-center gap-4 text-sm text-muted-foreground mb-4">
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

      {/* Rule matches preview */}
      {scheme.ruleMatches && (
        <div className="flex items-center gap-3 mb-4">
          {Object.entries(scheme.ruleMatches).slice(0, 3).map(([key, value]) => (
            <span 
              key={key} 
              className={cn(
                "text-xs px-2 py-1 rounded-full",
                value ? "bg-success/10 text-success" : "bg-destructive/10 text-destructive"
              )}
            >
              {value ? '✓' : '✗'} {key}
            </span>
          ))}
        </div>
      )}

      {/* Action */}
      <Link to={`/scheme/${scheme.id}`}>
        <Button variant="accent-outline" className="w-full group">
          View Details
          <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
        </Button>
      </Link>
    </div>
  );
};
