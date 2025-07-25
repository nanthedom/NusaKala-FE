import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { CheckCircle, AlertTriangle, Info, X } from 'lucide-react'
import { useTranslation } from '@/hooks/useTranslation'
import { type ValidationResult } from '@/services/event.service'

interface ValidationAlertProps {
  validationResult: ValidationResult | null
  isValidating: boolean
  onApplySuggestion?: (suggestion: string) => void
  onDismiss?: () => void
}

export function ValidationAlert({ 
  validationResult, 
  isValidating, 
  onApplySuggestion,
  onDismiss 
}: ValidationAlertProps) {
  const { tSync } = useTranslation()

  if (isValidating) {
    return (
      <Alert className="border-nusa-gold/30 bg-nusa-cream/50">
        <div className="flex items-center gap-2">
          <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-nusa-gold"></div>
          <AlertTitle className="text-nusa-brown">
            {tSync('validation.validating', 'Validating content...')}
          </AlertTitle>
        </div>
      </Alert>
    )
  }

  if (!validationResult) {
    return null
  }

  const { status, score, warnings, suggestions } = validationResult

  if (status === 'approved') {
    return (
      <Alert className="border-green-200 bg-green-50">
        <CheckCircle className="h-4 w-4 text-green-600" />
        <AlertTitle className="text-green-800">
          {tSync('validation.approved', 'Content Approved')}
        </AlertTitle>
        <AlertDescription className="text-green-700">
          {tSync('validation.approvedDesc', 'Your content meets our quality standards')}
          {score && (
            <Badge variant="outline" className="ml-2 text-xs">
              Score: {Math.round(score * 100)}%
            </Badge>
          )}
        </AlertDescription>
      </Alert>
    )
  }

  if (status === 'pending_review') {
    return (
      <Alert className="border-yellow-200 bg-yellow-50">
        <Info className="h-4 w-4 text-yellow-600" />
        <AlertTitle className="text-yellow-800">
          {tSync('validation.pendingReview', 'Content Needs Review')}
        </AlertTitle>
        <AlertDescription className="text-yellow-700">
          {tSync('validation.pendingReviewDesc', 'Your content will be reviewed by our team')}
          {score && (
            <Badge variant="outline" className="ml-2 text-xs">
              Score: {Math.round(score * 100)}%
            </Badge>
          )}
        </AlertDescription>
      </Alert>
    )
  }

  if (status === 'rejected') {
    return (
      <Alert className="border-red-200 bg-red-50">
        <div className="flex items-start justify-between">
          <div className="flex items-start gap-2">
            <AlertTriangle className="h-4 w-4 text-red-600 mt-0.5" />
            <div>
              <AlertTitle className="text-red-800">
                {tSync('validation.rejected', 'Content Rejected')}
              </AlertTitle>
              <AlertDescription className="text-red-700 mt-1">
                {tSync('validation.rejectedDesc', 'Please review and update your content')}
                {score && (
                  <Badge variant="outline" className="ml-2 text-xs">
                    Score: {Math.round(score * 100)}%
                  </Badge>
                )}
              </AlertDescription>
            </div>
          </div>
          {onDismiss && (
            <Button
              variant="ghost"
              size="sm"
              onClick={onDismiss}
              className="text-red-600 hover:text-red-800"
            >
              <X className="h-4 w-4" />
            </Button>
          )}
        </div>

        {/* Warnings */}
        {warnings && warnings.length > 0 && (
          <div className="mt-3">
            <h4 className="text-sm font-medium text-red-800 mb-2">
              {tSync('validation.warnings', 'Warnings:')}
            </h4>
            <ul className="space-y-1">
              {warnings.map((warning, index) => (
                <li key={index} className="text-sm text-red-700 flex items-start gap-2">
                  <span className="text-red-500 mt-0.5">•</span>
                  {warning}
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Suggestions */}
        {suggestions && suggestions.length > 0 && (
          <div className="mt-3">
            <h4 className="text-sm font-medium text-red-800 mb-2">
              {tSync('validation.suggestions', 'Suggestions:')}
            </h4>
            <div className="space-y-2">
              {suggestions.map((suggestion, index) => (
                <div key={index} className="flex items-center gap-2">
                  <span className="text-sm text-red-700 flex-1">{suggestion}</span>
                  {onApplySuggestion && (
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => onApplySuggestion(suggestion)}
                      className="text-xs h-6 px-2"
                    >
                      {tSync('validation.apply', 'Apply')}
                    </Button>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}
      </Alert>
    )
  }

  return null
} 