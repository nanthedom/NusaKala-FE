import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { AlertTriangle, CheckCircle, Info } from 'lucide-react'
import { useTranslation } from '@/hooks/useTranslation'

interface ValidationSummary {
  status: 'approved' | 'pending_review' | 'rejected'
  score: number
  method: string
  reason: string
  saraStatus: string
  culturalStatus: string
  qualityStatus: string
  toxicityLevel: string
  warnings: string[]
  suggestions: string[]
}

interface WarningModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  validationSummary: ValidationSummary | null
  onEdit?: () => void
  onCancel?: () => void
}

export function WarningModal({
  open,
  onOpenChange,
  validationSummary,
  onEdit,
  onCancel
}: WarningModalProps) {
  const { tSync } = useTranslation()

  if (!validationSummary) return null

  const { status, score, reason, warnings, suggestions, saraStatus, culturalStatus, qualityStatus, toxicityLevel } = validationSummary

  const getStatusIcon = () => {
    switch (status) {
      case 'approved':
        return <CheckCircle className="h-5 w-5 text-green-600" />
      case 'pending_review':
        return <Info className="h-5 w-5 text-yellow-600" />
      case 'rejected':
        return <AlertTriangle className="h-5 w-5 text-red-600" />
      default:
        return <Info className="h-5 w-5 text-gray-600" />
    }
  }

  const getStatusColor = () => {
    switch (status) {
      case 'approved':
        return 'text-green-800 bg-green-50 border-green-200'
      case 'pending_review':
        return 'text-yellow-800 bg-yellow-50 border-yellow-200'
      case 'rejected':
        return 'text-red-800 bg-red-50 border-red-200'
      default:
        return 'text-gray-800 bg-gray-50 border-gray-200'
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <div className="flex items-center gap-3">
            {getStatusIcon()}
            <div>
              <DialogTitle className="text-xl">
                {status === 'approved' && tSync('modal.approved.title', 'Event Approved')}
                {status === 'pending_review' && tSync('modal.pendingReview.title', 'Event Needs Review')}
                {status === 'rejected' && tSync('modal.rejected.title', 'Event Cannot Be Created')}
              </DialogTitle>
              <DialogDescription className="text-sm mt-1">
                {reason}
              </DialogDescription>
            </div>
          </div>
        </DialogHeader>

        <div className="space-y-6">
          {/* Score and Status */}
          <div className="flex items-center justify-between p-4 rounded-lg border">
            <div>
              <h3 className="font-medium text-nusa-dark-brown">
                {tSync('modal.validationScore', 'Validation Score')}
              </h3>
              <p className="text-sm text-nusa-brown">
                {tSync('modal.scoreDescription', 'Content quality assessment')}
              </p>
            </div>
            <Badge variant="outline" className="text-lg px-3 py-1">
              {Math.round(score * 100)}%
            </Badge>
          </div>

          {/* Detailed Analysis */}
          <div className="space-y-4">
            <h3 className="font-medium text-nusa-dark-brown">
              {tSync('modal.detailedAnalysis', 'Detailed Analysis')}
            </h3>
            
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-nusa-brown">
                    {tSync('modal.saraStatus', 'SARA Check')}
                  </span>
                  <Badge 
                    variant={saraStatus === 'POSITIF' ? 'default' : 'destructive'}
                    className="text-xs"
                  >
                    {saraStatus}
                  </Badge>
                </div>
                
                <div className="flex items-center justify-between">
                  <span className="text-sm text-nusa-brown">
                    {tSync('modal.culturalRelevance', 'Cultural Relevance')}
                  </span>
                  <Badge 
                    variant={culturalStatus === 'POSITIF' ? 'default' : 'secondary'}
                    className="text-xs"
                  >
                    {culturalStatus}
                  </Badge>
                </div>
              </div>
              
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-nusa-brown">
                    {tSync('modal.contentQuality', 'Content Quality')}
                  </span>
                  <Badge 
                    variant={qualityStatus === 'POSITIF' ? 'default' : 'secondary'}
                    className="text-xs"
                  >
                    {qualityStatus}
                  </Badge>
                </div>
                
                <div className="flex items-center justify-between">
                  <span className="text-sm text-nusa-brown">
                    {tSync('modal.toxicityLevel', 'Toxicity Level')}
                  </span>
                  <Badge 
                    variant={toxicityLevel === 'LOW' ? 'default' : 'destructive'}
                    className="text-xs"
                  >
                    {toxicityLevel}
                  </Badge>
                </div>
              </div>
            </div>
          </div>

          {/* Warnings */}
          {warnings.length > 0 && (
            <div className="space-y-3">
              <h3 className="font-medium text-nusa-dark-brown">
                {tSync('modal.warnings', 'Warnings')}
              </h3>
              <div className="space-y-2">
                {warnings.map((warning, index) => (
                  <div key={index} className="flex items-start gap-2 p-3 bg-red-50 border border-red-200 rounded-lg">
                    <AlertTriangle className="h-4 w-4 text-red-600 mt-0.5 shrink-0" />
                    <span className="text-sm text-red-700">{warning}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Suggestions */}
          {suggestions.length > 0 && (
            <div className="space-y-3">
              <h3 className="font-medium text-nusa-dark-brown">
                {tSync('modal.suggestions', 'Suggestions for Improvement')}
              </h3>
              <div className="space-y-2">
                {suggestions.map((suggestion, index) => (
                  <div key={index} className="flex items-start gap-2 p-3 bg-blue-50 border border-blue-200 rounded-lg">
                    <Info className="h-4 w-4 text-blue-600 mt-0.5 shrink-0" />
                    <span className="text-sm text-blue-700">{suggestion}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        <DialogFooter className="flex gap-2">
          {status === 'rejected' && onEdit && (
            <Button onClick={onEdit} className="bg-nusa-gold hover:bg-nusa-gold-dark">
              {tSync('modal.editEvent', 'Edit Event')}
            </Button>
          )}
          <Button 
            variant="outline" 
            onClick={onCancel || (() => onOpenChange(false))}
          >
            {tSync('modal.close', 'Close')}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
} 