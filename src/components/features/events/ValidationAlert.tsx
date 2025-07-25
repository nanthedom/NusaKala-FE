import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { CheckCircle, AlertTriangle, Info, X, Shield, Lightbulb, AlertCircle } from 'lucide-react'
import { useTranslation } from '@/hooks/useTranslation'
import { type ValidationResult } from '@/services/event.service'
import { cn } from '@/lib/utils'

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
      <Card className="border-nusa-gold/30 bg-gradient-to-r from-nusa-cream/50 to-nusa-beige/50 shadow-lg animate-in slide-in-from-top-2 duration-300">
        <CardContent className="p-6">
          <div className="flex items-center gap-3">
            <div className="relative">
              <div className="animate-spin rounded-full h-8 w-8 border-3 border-nusa-gold/30 border-t-nusa-gold"></div>
              <div className="absolute inset-0 rounded-full h-8 w-8 border-2 border-nusa-gold/20 animate-ping"></div>
            </div>
            <div>
              <h3 className="font-semibold text-nusa-dark-brown">
                {tSync('validation.validating', 'Validating Content...')}
              </h3>
              <p className="text-sm text-nusa-brown">
                {tSync('validation.validatingDesc', 'Analyzing your content for quality and compliance')}
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    )
  }

  if (!validationResult) {
    return null
  }

  const { status, score, warnings, suggestions } = validationResult
  const scorePercentage = score ? Math.round(score * 100) : 0

  if (status === 'approved') {
    return (
      <Card className="border-green-200 bg-gradient-to-r from-green-50 to-emerald-50 shadow-lg animate-in slide-in-from-top-2 duration-300">
        <CardContent className="p-6">
          <div className="flex items-start justify-between">
            <div className="flex items-start gap-4">
              <div className="relative">
                <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center animate-in zoom-in-50 duration-300">
                  <CheckCircle className="h-6 w-6 text-green-600" />
                </div>
                <div className="absolute -top-1 -right-1 w-6 h-6 bg-green-500 rounded-full flex items-center justify-center animate-in zoom-in-50 duration-500 delay-200">
                  <span className="text-white text-xs font-bold">✓</span>
                </div>
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-2">
                  <h3 className="text-lg font-bold text-green-800">
                    {tSync('validation.approved', 'Content Approved')}
                  </h3>
                  <Badge className="bg-green-100 text-green-800 border-green-200 animate-in slide-in-from-right-2 duration-300 delay-100">
                    Score: {scorePercentage}%
                  </Badge>
                </div>
                <p className="text-green-700">
                  {tSync('validation.approvedDesc', 'Your content meets our quality standards and is ready to be published!')}
                </p>
              </div>
            </div>
            {onDismiss && (
              <Button
                variant="ghost"
                size="sm"
                onClick={onDismiss}
                className="text-green-600 hover:text-green-800 hover:bg-green-100 transition-colors"
              >
                <X className="h-4 w-4" />
              </Button>
            )}
          </div>
        </CardContent>
      </Card>
    )
  }

  if (status === 'pending_review') {
    return (
      <Card className="border-yellow-200 bg-gradient-to-r from-yellow-50 to-amber-50 shadow-lg animate-in slide-in-from-top-2 duration-300">
        <CardContent className="p-6">
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 bg-yellow-100 rounded-full flex items-center justify-center animate-in zoom-in-50 duration-300">
              <Info className="h-6 w-6 text-yellow-600" />
            </div>
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-2">
                <h3 className="text-lg font-bold text-yellow-800">
                  {tSync('validation.pendingReview', 'Content Needs Review')}
                </h3>
                <Badge className="bg-yellow-100 text-yellow-800 border-yellow-200 animate-in slide-in-from-right-2 duration-300 delay-100">
                  Score: {scorePercentage}%
                </Badge>
              </div>
              <p className="text-yellow-700">
                {tSync('validation.pendingReviewDesc', 'Your content will be reviewed by our team before publication')}
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    )
  }

  if (status === 'rejected') {
    return (
      <Card className="border-red-200 bg-gradient-to-r from-red-50 to-rose-50 shadow-lg animate-in slide-in-from-top-2 duration-300">
        <CardContent className="p-6">
          <div className="flex items-start justify-between mb-4">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center animate-in zoom-in-50 duration-300">
                <AlertTriangle className="h-6 w-6 text-red-600" />
              </div>
              <div>
                <div className="flex items-center gap-3 mb-2">
                  <h3 className="text-lg font-bold text-red-800">
                    {tSync('validation.rejected', 'Content Rejected')}
                  </h3>
                  <Badge className="bg-red-100 text-red-800 border-red-200 animate-in slide-in-from-right-2 duration-300 delay-100">
                    Score: {scorePercentage}%
                  </Badge>
                </div>
                <p className="text-red-700">
                  {tSync('validation.rejectedDesc', 'Please review and update your content to meet our standards')}
                </p>
              </div>
            </div>
            {onDismiss && (
              <Button
                variant="ghost"
                size="sm"
                onClick={onDismiss}
                className="text-red-600 hover:text-red-800 hover:bg-red-100 transition-colors"
              >
                <X className="h-4 w-4" />
              </Button>
            )}
          </div>

          {/* Warnings Section */}
          {warnings && warnings.length > 0 && (
            <div className="mb-6 p-4 bg-red-100/50 rounded-lg border border-red-200 animate-in slide-in-from-left-2 duration-300 delay-200">
              <div className="flex items-center gap-2 mb-3">
                <AlertCircle className="h-4 w-4 text-red-600" />
                <h4 className="font-semibold text-red-800">
                  {tSync('validation.warnings', 'Issues Found:')}
                </h4>
              </div>
              <ul className="space-y-2">
                {warnings.map((warning, index) => (
                  <li key={index} className="flex items-start gap-3 text-sm text-red-700 animate-in slide-in-from-left-2 duration-300" style={{ animationDelay: `${300 + index * 100}ms` }}>
                    <div className="w-2 h-2 bg-red-500 rounded-full mt-2 flex-shrink-0"></div>
                    <span className="leading-relaxed">{warning}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Suggestions Section */}
          {suggestions && suggestions.length > 0 && (
            <div className="p-4 bg-blue-50 rounded-lg border border-blue-200 animate-in slide-in-from-left-2 duration-300 delay-300">
              <div className="flex items-center gap-2 mb-3">
                <Lightbulb className="h-4 w-4 text-blue-600" />
                <h4 className="font-semibold text-blue-800">
                  {tSync('validation.suggestions', 'Improvement Suggestions:')}
                </h4>
              </div>
              <div className="space-y-3">
                {suggestions.map((suggestion, index) => (
                  <div key={index} className="flex items-start gap-3 p-3 bg-white rounded-lg border border-blue-100 animate-in slide-in-from-left-2 duration-300 hover:shadow-md transition-shadow" style={{ animationDelay: `${400 + index * 100}ms` }}>
                    <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 flex-shrink-0"></div>
                    <div className="flex-1">
                      <p className="text-sm text-blue-800 leading-relaxed">{suggestion}</p>
                    </div>
                    {onApplySuggestion && (
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => onApplySuggestion(suggestion)}
                        className="text-xs h-7 px-3 bg-blue-50 border-blue-200 text-blue-700 hover:bg-blue-100 transition-all duration-200 hover:scale-105"
                      >
                        {tSync('validation.apply', 'Apply')}
                      </Button>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    )
  }

  return null
} 