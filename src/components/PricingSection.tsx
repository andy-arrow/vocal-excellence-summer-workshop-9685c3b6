
import React from "react";
import { Link } from "react-router-dom";
import { Check, Info } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import SecurePaymentBadge from "@/components/ui/SecurePaymentBadge";
import GuaranteeBadge from "@/components/ui/GuaranteeBadge";

const PricingSection = () => {
  return (
    <section id="pricing" className="py-20 bg-white">
      <div className="container mx-auto px-6">
        <div className="max-w-prose mx-auto text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-serif font-light text-apple-text mb-4">
            Training That Fits Your Budget
          </h2>
          <p className="text-lg text-apple-grey">
            Only €28 per day for world-class vocal training that launches careers
          </p>
        </div>

        <div className="max-w-3xl mx-auto bg-slate-50 rounded-xl p-8 mb-12">
          <h3 className="text-xl font-bold mb-4">Your Price Journey</h3>
          <div className="space-y-6">
            <div className="flex items-start gap-4">
              <div className="flex-shrink-0 w-8 h-8 flex items-center justify-center rounded-full bg-apple-blue text-white font-bold">
                1
              </div>
              <div>
                <h4 className="font-bold text-lg">Apply Free</h4>
                <p className="text-apple-grey max-w-prose">Submit your application with no obligation or application fee.</p>
              </div>
            </div>
            
            <div className="flex items-start gap-4">
              <div className="flex-shrink-0 w-8 h-8 flex items-center justify-center rounded-full bg-apple-blue text-white font-bold">
                2
              </div>
              <div>
                <h4 className="font-bold text-lg">Upon Acceptance: €100 Deposit</h4>
                <p className="text-apple-grey max-w-prose">Pay a non-refundable €100 deposit to secure your place. This amount is credited toward your total tuition.</p>
              </div>
            </div>
            
            <div className="flex items-start gap-4">
              <div className="flex-shrink-0 w-8 h-8 flex items-center justify-center rounded-full bg-apple-blue text-white font-bold">
                3
              </div>
              <div>
                <h4 className="font-bold text-lg">Choose Your Payment Plan</h4>
                <p className="text-apple-grey max-w-prose">Select either our Pay-in-Full discount option or our Easy Plan with three installments.</p>
              </div>
            </div>
          </div>
        </div>
        
        <div className="max-w-3xl mx-auto mb-12">
          <div className="grid md:grid-cols-2 gap-8">
            {/* Pay in Full Option */}
            <div className="border border-slate-200 rounded-xl p-8 bg-white hover:shadow-md transition duration-300">
              <div className="text-center mb-6">
                <h3 className="text-xl font-bold mb-2">Pay in Full</h3>
                <div className="text-3xl font-bold mb-2">€899</div>
                <p className="text-apple-grey text-sm">after €100 deposit</p>
                <div className="text-xs text-green-600 mt-2">Save €50</div>
              </div>
              
              <div className="space-y-3 mb-8">
                <div className="flex items-center gap-2">
                  <Check className="text-green-500 w-5 h-5 flex-shrink-0" />
                  <span className="text-apple-grey">One simple payment</span>
                </div>
                <div className="flex items-center gap-2">
                  <Check className="text-green-500 w-5 h-5 flex-shrink-0" />
                  <span className="text-apple-grey">Best value option</span>
                </div>
                <div className="flex items-center gap-2">
                  <Check className="text-green-500 w-5 h-5 flex-shrink-0" />
                  <span className="text-apple-grey">Complete immediately</span>
                </div>
              </div>
              
              <Button size="lg" variant="outline" className="w-full">
                Apply Free
              </Button>
            </div>
            
            {/* Easy Plan Option */}
            <div className="border-2 border-apple-blue rounded-xl p-8 bg-white relative hover:shadow-md transition duration-300">
              <div className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-apple-blue text-white px-4 py-1 rounded-full text-sm font-medium">
                Most Popular
              </div>
            
              <div className="text-center mb-6">
                <h3 className="text-xl font-bold mb-2">Easy Plan</h3>
                <div className="text-3xl font-bold mb-2">€299</div>
                <p className="text-apple-grey text-sm">× 3 monthly payments</p>
                <div className="text-xs text-apple-grey mt-2">after €100 deposit</div>
              </div>
              
              <div className="space-y-3 mb-8">
                <div className="flex items-center gap-2">
                  <Check className="text-green-500 w-5 h-5 flex-shrink-0" />
                  <span className="text-apple-grey">Three easy payments</span>
                </div>
                <div className="flex items-center gap-2">
                  <Check className="text-green-500 w-5 h-5 flex-shrink-0" />
                  <span className="text-apple-grey">No interest or fees</span>
                </div>
                <div className="flex items-center gap-2">
                  <Check className="text-green-500 w-5 h-5 flex-shrink-0" />
                  <span className="text-apple-grey">Automatic billing</span>
                </div>
              </div>
              
              <Button size="lg" className="w-full">
                Apply Free
              </Button>
            </div>
          </div>
        </div>
        
        <div className="max-w-3xl mx-auto flex flex-col sm:flex-row gap-4 items-center justify-center mb-12">
          <Link to="/apply">
            <Button size="lg" className="min-w-[200px]">
              Apply Free
            </Button>
          </Link>
          <Link to="/apply">
            <Button size="lg" variant="outline" className="min-w-[200px]">
              Secure Spot for €100
            </Button>
          </Link>
        </div>
        
        <div className="max-w-md mx-auto text-center flex justify-center gap-4 mb-8">
          <GuaranteeBadge />
          <SecurePaymentBadge />
        </div>
        
        <div className="max-w-3xl mx-auto mb-8">
          <h3 className="text-xl font-bold mb-6 text-center">Frequently Asked Questions</h3>
          <Accordion type="single" collapsible className="w-full">
            <AccordionItem value="item-1">
              <AccordionTrigger className="text-left">
                Is the €100 deposit refundable?
              </AccordionTrigger>
              <AccordionContent className="max-w-prose">
                No. The €100 deposit is non-refundable but is credited toward your total tuition cost. This deposit ensures your commitment and holds your place in our limited-enrollment program.
              </AccordionContent>
            </AccordionItem>
            
            <AccordionItem value="item-2">
              <AccordionTrigger className="text-left">
                Are there any hidden fees with the payment plans?
              </AccordionTrigger>
              <AccordionContent className="max-w-prose">
                Absolutely not. The Easy Plan installment option comes with no interest charges or additional fees. You'll pay exactly the same total amount (€999) as the program cost, just divided into three convenient payments of €299 each, plus your initial €100 deposit.
              </AccordionContent>
            </AccordionItem>
            
            <AccordionItem value="item-3">
              <AccordionTrigger className="text-left">
                What is your cancellation policy?
              </AccordionTrigger>
              <AccordionContent className="max-w-prose">
                Cancellations made more than 60 days before the program start date receive a 75% refund (excluding the non-refundable deposit). Cancellations 30-60 days prior receive a 50% refund. No refunds are available for cancellations less than 30 days before the program begins. All refund requests must be submitted in writing.
              </AccordionContent>
            </AccordionItem>
            
            <AccordionItem value="item-4">
              <AccordionTrigger className="text-left">
                What does the tuition include?
              </AccordionTrigger>
              <AccordionContent className="max-w-prose">
                Your €999 tuition covers all instruction (group classes, private coaching, masterclasses), performance opportunities, course materials, and a professional recording session. Housing and meals are available for an additional fee. Transportation to Cyprus is not included.
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>
        
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-8">
            <div className="inline-flex items-center px-4 py-2 bg-amber-50 border border-amber-100 rounded-full">
              <span className="font-medium text-amber-800">Only 8 spots remaining for 2025</span>
            </div>
          </div>
          
          <div className="text-center text-xs text-apple-grey max-w-prose mx-auto">
            <p>
              *The total program cost is €999. The Easy Plan includes your initial €100 non-refundable deposit followed by three monthly payments of €299 each with no additional fees or interest charges. Subject to acceptance into the program.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PricingSection;
