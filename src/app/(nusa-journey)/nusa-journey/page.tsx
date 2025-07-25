"use client"

import { useState, useMemo } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { Checkbox } from "@/components/ui/checkbox"
import { Calendar, MapPin, Plane, Sparkles, CheckSquare } from "lucide-react"
import { useTranslation } from "@/hooks/useTranslation"
import { INDONESIA_DATA } from "./indonesia"
import ReactMarkdown from "react-markdown"

interface PromptOptions {
    culturalSites: boolean
    foodRecommendations: boolean
    transportation: boolean
    budgetEstimates: boolean
    bestTimes: boolean
    festivals: boolean
}

export default function NusaJourneyPage() {
    const { tSync } = useTranslation()
    const [formData, setFormData] = useState({
        startDate: "",
        endDate: "",
        province: "",
        city: "",
        additionalPreferences: "",
    })

    const [promptOptions, setPromptOptions] = useState<PromptOptions>({
        culturalSites: true,
        foodRecommendations: true,
        transportation: true,
        budgetEstimates: true,
        bestTimes: true,
        festivals: true,
    })

    const [isLoading, setIsLoading] = useState(false)
    const [journeyPlan, setJourneyPlan] = useState("")
    const [error, setError] = useState("")

    // Get available cities based on selected province
    const availableCities = useMemo(() => {
        if (!formData.province) return []
        const selectedProvince = INDONESIA_DATA.find((province) => province.id === formData.province)
        return selectedProvince?.cities || []
    }, [formData.province])

    const handleInputChange = (field: string, value: string) => {
        setFormData((prev) => {
            const newData = { ...prev, [field]: value }
            // Reset city when province changes
            if (field === "province") {
                newData.city = ""
            }
            return newData
        })
    }

    const handleOptionChange = (option: keyof PromptOptions, checked: boolean) => {
        setPromptOptions((prev) => ({
            ...prev,
            [option]: checked,
        }))
    }

    const generatePrompt = () => {
        const { startDate, endDate, province, city, additionalPreferences } = formData

        // Find province and city names
        const selectedProvince = INDONESIA_DATA.find((p) => p.id === province)
        const selectedCity = availableCities.find((c) => c.id === city)
        const provinceName = selectedProvince?.name || province
        const cityName = selectedCity?.name || city

        let prompt = `Create a detailed travel itinerary for Indonesia with the following details:

Travel Dates: ${startDate} to ${endDate}
Destination: ${cityName}, ${provinceName}
Additional Preferences: ${additionalPreferences || "None specified"}

Please provide:
1. A day-by-day itinerary with cultural activities, must-visit places, and local experiences`

        if (promptOptions.culturalSites) {
            prompt += `
2. Traditional Indonesian cultural sites and experiences to include`
        }

        if (promptOptions.foodRecommendations) {
            prompt += `
3. Local food recommendations and cultural dining experiences`
        }

        if (promptOptions.transportation) {
            prompt += `
4. Transportation suggestions between locations`
        }

        if (promptOptions.budgetEstimates) {
            prompt += `
5. Budget estimates for activities and accommodations`
        }

        if (promptOptions.bestTimes) {
            prompt += `
6. Best times to visit specific attractions`
        }

        if (promptOptions.festivals) {
            prompt += `
7. Traditional festivals or events happening during the travel period`
        }

        prompt += `

Focus on authentic Indonesian cultural experiences, traditional arts, local communities, and heritage sites. Make the itinerary practical and culturally enriching.`

        return prompt
    }

    const handleStartJourney = async () => {
        if (!formData.startDate || !formData.endDate || !formData.province || !formData.city) {
            setError("Please fill in all required fields")
            return
        }

        if (new Date(formData.startDate) > new Date(formData.endDate)) {
            setError("End date must be after start date")
            return
        }

        setIsLoading(true)
        setError("")
        setJourneyPlan("")

        try {
            const prompt = generatePrompt()
            const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/ai/ask`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ prompt }),
            })

            if (!response.ok) {
                throw new Error("Failed to generate journey plan")
            }

            const data = await response.json()
            setJourneyPlan(data.result)
        } catch (err) {
            setError("Failed to generate your journey plan. Please try again.")
            console.error("Journey planning error:", err)
        } finally {
            setIsLoading(false)
        }
    }

    const resetForm = () => {
        setFormData({
            startDate: "",
            endDate: "",
            province: "",
            city: "",
            additionalPreferences: "",
        })
        setPromptOptions({
            culturalSites: false,
            foodRecommendations: false,
            transportation: false,
            budgetEstimates: false,
            bestTimes: false,
            festivals: false,
        })
        setJourneyPlan("")
        setError("")
    }

    return (
        <div className="min-h-screen py-4 sm:py-6 lg:py-8">
            <div className="container mx-auto max-w-4xl px-3 sm:px-4 lg:px-6">
                {/* Header */}
                <div className="text-center mb-6 sm:mb-8 lg:mb-10">
                    <div className="flex items-center justify-center mb-2 sm:mb-3">
                        <Plane className="h-5 w-5 sm:h-6 sm:w-6 md:h-7 md:w-7 lg:h-8 lg:w-8 text-nusa-gold mr-2 sm:mr-3 flex-shrink-0" />
                        <h1 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-heading font-bold text-nusa-dark-brown leading-tight">
                            {tSync("journey.title", "Nusa Journey")}
                        </h1>
                    </div>
                    <p className="text-xs sm:text-sm md:text-base lg:text-lg text-nusa-brown max-w-3xl mx-auto px-2">
                        {tSync(
                            "journey.subtitle",
                            "Plan your perfect cultural journey through Indonesia with AI-powered recommendations",
                        )}
                    </p>
                </div>

                {!journeyPlan ? (
                    /* Planning Form */
                    <Card className="bg-white shadow-lg border-0">
                        <CardHeader className="text-center pb-3 sm:pb-4 lg:pb-6 px-3 sm:px-4 lg:px-6">
                            <CardTitle className="text-lg sm:text-xl lg:text-2xl font-heading text-nusa-dark-brown flex items-center justify-center flex-wrap gap-2">
                                <MapPin className="h-4 w-4 sm:h-5 sm:w-5 lg:h-6 lg:w-6 text-nusa-gold flex-shrink-0" />
                                <span className="text-center">{tSync("journey.planTitle", "Plan Your Journey")}</span>
                            </CardTitle>
                            <CardDescription className="text-nusa-brown text-xs sm:text-sm lg:text-base px-2">
                                {tSync(
                                    "journey.planDescription",
                                    "Tell us about your travel plans and we'll create a personalized cultural itinerary",
                                )}
                            </CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4 sm:space-y-5 lg:space-y-6 px-3 sm:px-4 lg:px-6">
                            {/* Date Selection Row */}
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                                {/* Start Date */}
                                <div className="space-y-2">
                                    <Label
                                        htmlFor="startDate"
                                        className="text-nusa-dark-brown font-medium flex items-center text-xs sm:text-sm lg:text-base"
                                    >
                                        <Calendar className="h-3 w-3 sm:h-4 sm:w-4 mr-1.5 sm:mr-2 flex-shrink-0" />
                                        <span>{tSync("journey.startDate", "Start Date")} *</span>
                                    </Label>
                                    <Input
                                        id="startDate"
                                        type="date"
                                        value={formData.startDate}
                                        onChange={(e) => handleInputChange("startDate", e.target.value)}
                                        min={new Date().toISOString().split("T")[0]}
                                        className="border-nusa-brown/20 focus:border-nusa-gold text-xs sm:text-sm lg:text-base h-9 sm:h-10 lg:h-11 w-full"
                                    />
                                </div>
                                {/* End Date */}
                                <div className="space-y-2">
                                    <Label
                                        htmlFor="endDate"
                                        className="text-nusa-dark-brown font-medium flex items-center text-xs sm:text-sm lg:text-base"
                                    >
                                        <Calendar className="h-3 w-3 sm:h-4 sm:w-4 mr-1.5 sm:mr-2 flex-shrink-0" />
                                        <span>{tSync("journey.endDate", "End Date")} *</span>
                                    </Label>
                                    <Input
                                        id="endDate"
                                        type="date"
                                        value={formData.endDate}
                                        onChange={(e) => handleInputChange("endDate", e.target.value)}
                                        min={formData.startDate || new Date().toISOString().split("T")[0]}
                                        className="border-nusa-brown/20 focus:border-nusa-gold text-xs sm:text-sm lg:text-base h-9 sm:h-10 lg:h-11 w-full"
                                    />
                                </div>
                            </div>

                            {/* Location Selection Row */}
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                                {/* Province Selection */}
                                <div className="space-y-2">
                                    <Label
                                        htmlFor="province"
                                        className="text-nusa-dark-brown font-medium flex items-center text-xs sm:text-sm lg:text-base"
                                    >
                                        <MapPin className="h-3 w-3 sm:h-4 sm:w-4 mr-1.5 sm:mr-2 flex-shrink-0" />
                                        <span>{tSync("journey.province", "Province")} *</span>
                                    </Label>
                                    <Select value={formData.province} onValueChange={(value) => handleInputChange("province", value)}>
                                        <SelectTrigger className="border-nusa-brown/20 focus:border-nusa-gold text-xs sm:text-sm lg:text-base h-9 sm:h-10 lg:h-11 w-full">
                                            <SelectValue placeholder={tSync("journey.selectProvince", "Select province")} />
                                        </SelectTrigger>
                                        <SelectContent className="max-h-[200px] overflow-y-auto">
                                            {INDONESIA_DATA.map((province) => (
                                                <SelectItem key={province.id} value={province.id} className="text-xs sm:text-sm">
                                                    {province.name}
                                                </SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                </div>
                                {/* City Selection */}
                                <div className="space-y-2">
                                    <Label
                                        htmlFor="city"
                                        className="text-nusa-dark-brown font-medium flex items-center text-xs sm:text-sm lg:text-base"
                                    >
                                        <Plane className="h-3 w-3 sm:h-4 sm:w-4 mr-1.5 sm:mr-2 flex-shrink-0" />
                                        <span>{tSync("journey.city", "City/Regency")} *</span>
                                    </Label>
                                    <Select
                                        value={formData.city}
                                        onValueChange={(value) => handleInputChange("city", value)}
                                        disabled={!formData.province}
                                    >
                                        <SelectTrigger className="border-nusa-brown/20 focus:border-nusa-gold text-xs sm:text-sm lg:text-base h-9 sm:h-10 lg:h-11 w-full disabled:opacity-50">
                                            <SelectValue
                                                placeholder={
                                                    formData.province
                                                        ? tSync("journey.selectCity", "Select city/regency")
                                                        : tSync("journey.selectProvinceFirst", "Select province first")
                                                }
                                            />
                                        </SelectTrigger>
                                        <SelectContent className="max-h-[200px] overflow-y-auto">
                                            {availableCities.map((city) => (
                                                <SelectItem key={city.id} value={city.id} className="text-xs sm:text-sm">
                                                    {city.name} ({city.type === "kota" ? "Kota" : "Kabupaten"})
                                                </SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                </div>
                            </div>

                            {/* Itinerary Options */}
                            <div className="space-y-3">
                                <Label className="text-nusa-dark-brown font-medium flex items-center text-xs sm:text-sm lg:text-base">
                                    <CheckSquare className="h-3 w-3 sm:h-4 sm:w-4 mr-1.5 sm:mr-2 flex-shrink-0" />
                                    <span>{tSync("journey.itineraryOptions", "What to include in your itinerary")}</span>
                                </Label>
                                <div className="bg-nusa-cream/30 p-3 sm:p-4 rounded-lg border border-nusa-gold/20">
                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                                        <div className="flex items-center space-x-2">
                                            <Checkbox
                                                id="culturalSites"
                                                checked={promptOptions.culturalSites}
                                                onCheckedChange={(checked) => handleOptionChange("culturalSites", checked)}
                                                className="border-nusa-brown/30 data-[state=checked]:bg-nusa-gold data-[state=checked]:border-nusa-gold"
                                            />
                                            <Label htmlFor="culturalSites" className="text-xs sm:text-sm text-nusa-dark-brown cursor-pointer">
                                                {tSync("journey.culturalSites", "Cultural sites & experiences")}
                                            </Label>
                                        </div>

                                        <div className="flex items-center space-x-2">
                                            <Checkbox
                                                id="foodRecommendations"
                                                checked={promptOptions.foodRecommendations}
                                                onCheckedChange={(checked) => handleOptionChange("foodRecommendations", checked)}
                                                className="border-nusa-brown/30 data-[state=checked]:bg-nusa-gold data-[state=checked]:border-nusa-gold"
                                            />
                                            <Label
                                                htmlFor="foodRecommendations"
                                                className="text-xs sm:text-sm text-nusa-dark-brown cursor-pointer"
                                            >
                                                {tSync("journey.foodRecommendations", "Local food recommendations")}
                                            </Label>
                                        </div>

                                        <div className="flex items-center space-x-2">
                                            <Checkbox
                                                id="transportation"
                                                checked={promptOptions.transportation}
                                                onCheckedChange={(checked) => handleOptionChange("transportation", checked)}
                                                className="border-nusa-brown/30 data-[state=checked]:bg-nusa-gold data-[state=checked]:border-nusa-gold"
                                            />
                                            <Label
                                                htmlFor="transportation"
                                                className="text-xs sm:text-sm text-nusa-dark-brown cursor-pointer"
                                            >
                                                {tSync("journey.transportation", "Transportation suggestions")}
                                            </Label>
                                        </div>

                                        <div className="flex items-center space-x-2">
                                            <Checkbox
                                                id="budgetEstimates"
                                                checked={promptOptions.budgetEstimates}
                                                onCheckedChange={(checked) => handleOptionChange("budgetEstimates", checked)}
                                                className="border-nusa-brown/30 data-[state=checked]:bg-nusa-gold data-[state=checked]:border-nusa-gold"
                                            />
                                            <Label
                                                htmlFor="budgetEstimates"
                                                className="text-xs sm:text-sm text-nusa-dark-brown cursor-pointer"
                                            >
                                                {tSync("journey.budgetEstimates", "Budget estimates")}
                                            </Label>
                                        </div>

                                        <div className="flex items-center space-x-2">
                                            <Checkbox
                                                id="bestTimes"
                                                checked={promptOptions.bestTimes}
                                                onCheckedChange={(checked) => handleOptionChange("bestTimes", checked)}
                                                className="border-nusa-brown/30 data-[state=checked]:bg-nusa-gold data-[state=checked]:border-nusa-gold"
                                            />
                                            <Label htmlFor="bestTimes" className="text-xs sm:text-sm text-nusa-dark-brown cursor-pointer">
                                                {tSync("journey.bestTimes", "Best times to visit attractions")}
                                            </Label>
                                        </div>

                                        <div className="flex items-center space-x-2">
                                            <Checkbox
                                                id="festivals"
                                                checked={promptOptions.festivals}
                                                onCheckedChange={(checked) => handleOptionChange("festivals", checked)}
                                                className="border-nusa-brown/30 data-[state=checked]:bg-nusa-gold data-[state=checked]:border-nusa-gold"
                                            />
                                            <Label htmlFor="festivals" className="text-xs sm:text-sm text-nusa-dark-brown cursor-pointer">
                                                {tSync("journey.festivals", "Traditional festivals & events")}
                                            </Label>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Additional Preferences */}
                            <div className="space-y-2">
                                <Label
                                    htmlFor="preferences"
                                    className="text-nusa-dark-brown font-medium text-xs sm:text-sm lg:text-base"
                                >
                                    {tSync("journey.preferences", "Additional Preferences (Optional)")}
                                </Label>
                                <Textarea
                                    id="preferences"
                                    placeholder={tSync(
                                        "journey.preferencesPlaceholder",
                                        "Tell us about your interests: traditional arts, specific regions, food preferences, budget range, activity types, etc.",
                                    )}
                                    value={formData.additionalPreferences}
                                    onChange={(e) => handleInputChange("additionalPreferences", e.target.value)}
                                    className="border-nusa-brown/20 focus:border-nusa-gold min-h-[60px] sm:min-h-[80px] lg:min-h-[100px] text-xs sm:text-sm lg:text-base resize-none"
                                />
                            </div>

                            {/* Error Message */}
                            {error && (
                                <div className="bg-red-50 border border-red-200 text-red-700 px-3 sm:px-4 py-2 sm:py-3 rounded-md text-xs sm:text-sm">
                                    {error}
                                </div>
                            )}

                            {/* Action Buttons */}
                            <div className="flex flex-col gap-3 sm:gap-4 pt-4">
                                <Button
                                    onClick={handleStartJourney}
                                    disabled={isLoading}
                                    className="w-full bg-nusa-gold hover:bg-nusa-gold-dark text-white font-medium py-2 sm:py-2.5 lg:py-3 text-xs sm:text-sm lg:text-base h-auto"
                                >
                                    {isLoading ? (
                                        <>
                                            <div className="animate-spin rounded-full h-3 w-3 sm:h-4 sm:w-4 border-b-2 border-white mr-2"></div>
                                            <span>{tSync("journey.generating", "Generating Journey...")}</span>
                                        </>
                                    ) : (
                                        <>
                                            <Sparkles className="h-3 w-3 sm:h-4 sm:w-4 mr-2" />
                                            <span>{tSync("journey.startJourney", "Start Journey")}</span>
                                        </>
                                    )}
                                </Button>
                                <Button
                                    onClick={resetForm}
                                    variant="outline"
                                    className="w-full border-nusa-brown text-nusa-brown hover:bg-nusa-brown hover:text-white bg-transparent py-2 sm:py-2.5 lg:py-3 text-xs sm:text-sm lg:text-base h-auto"
                                >
                                    {tSync("journey.reset", "Reset Form")}
                                </Button>
                            </div>
                        </CardContent>
                    </Card>
                ) : (
                    /* Journey Plan Results */
                    <Card className="bg-white shadow-lg border-0">
                        <CardHeader className="text-center pb-3 sm:pb-4 lg:pb-6 px-3 sm:px-4 lg:px-6">
                            <CardTitle className="text-lg sm:text-xl lg:text-2xl font-heading text-nusa-dark-brown flex items-center justify-center flex-wrap gap-2">
                                <Sparkles className="h-4 w-4 sm:h-5 sm:w-5 lg:h-6 lg:w-6 text-nusa-gold flex-shrink-0" />
                                <span className="text-center">{tSync("journey.yourJourney", "Your Nusa Journey Plan")}</span>
                            </CardTitle>
                            <CardDescription className="text-nusa-brown text-xs sm:text-sm lg:text-base px-2">
                                {tSync("journey.journeyDescription", "Here's your personalized cultural itinerary for Indonesia")}
                            </CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4 sm:space-y-5 lg:space-y-6 px-3 sm:px-4 lg:px-6">
                            {/* Journey Plan Content */}
                            <div className="w-full overflow-hidden">
                                <div className="bg-white p-3 sm:p-4 lg:p-6 rounded-lg border border-nusa-brown/10">
                                    <div className="prose prose-sm sm:prose-base max-w-none markdown-content">
                                        <ReactMarkdown
                                            components={{
                                                h1: ({ children }) => (
                                                    <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-nusa-dark-brown mb-4 mt-6">
                                                        {children}
                                                    </h1>
                                                ),
                                                h2: ({ children }) => (
                                                    <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold text-nusa-dark-brown mb-3 mt-5">
                                                        {children}
                                                    </h2>
                                                ),
                                                h3: ({ children }) => (
                                                    <h3 className="text-lg sm:text-xl lg:text-2xl font-semibold text-nusa-dark-brown mb-2 mt-4">
                                                        {children}
                                                    </h3>
                                                ),
                                                p: ({ children }) => (
                                                    <p className="text-nusa-brown mb-3 leading-relaxed text-sm sm:text-base">{children}</p>
                                                ),
                                                ul: ({ children }) => (
                                                    <ul className="list-disc list-inside mb-4 space-y-1 text-nusa-brown">{children}</ul>
                                                ),
                                                li: ({ children }) => <li className="text-sm sm:text-base text-nusa-brown ml-4">{children}</li>,
                                                strong: ({ children }) => (
                                                    <strong className="font-semibold text-nusa-dark-brown">{children}</strong>
                                                ),
                                                hr: () => <hr className="border-nusa-gold/30 my-6" />,
                                            }}
                                        >
                                            {journeyPlan}
                                        </ReactMarkdown>
                                    </div>
                                </div>
                            </div>

                            {/* Action Buttons */}
                            <div className="flex flex-col gap-3 sm:gap-4 pt-4 sm:pt-6 border-t border-nusa-brown/10">
                                <Button
                                    onClick={resetForm}
                                    className="w-full bg-nusa-gold hover:bg-nusa-gold-dark text-white font-medium py-2 sm:py-2.5 lg:py-3 text-xs sm:text-sm lg:text-base h-auto"
                                >
                                    {tSync("journey.planAnother", "Plan Another Journey")}
                                </Button>
                            </div>
                        </CardContent>
                    </Card>
                )}
            </div>
        </div>
    )
}
