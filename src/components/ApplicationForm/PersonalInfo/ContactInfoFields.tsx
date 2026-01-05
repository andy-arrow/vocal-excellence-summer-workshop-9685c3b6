
import { useState, useMemo } from 'react';
import { useFormContext } from 'react-hook-form';
import { 
  FormField, 
  FormItem, 
  FormLabel, 
  FormControl, 
  FormMessage,
  FormDescription 
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from '@/components/ui/command';
import { Check, ChevronDown } from 'lucide-react';
import { cn } from '@/lib/utils';
import { ApplicationFormValues } from '../schema';
import { COUNTRY_CODES } from '@/constants/countryCodes';

const ContactInfoFields = () => {
  const form = useFormContext<ApplicationFormValues>();
  const [open, setOpen] = useState(false);
  const [selectedCountry, setSelectedCountry] = useState(
    COUNTRY_CODES.find(c => c.code === "CY") || COUNTRY_CODES[0]
  );
  const [phoneNumber, setPhoneNumber] = useState("");

  const sortedCountries = useMemo(() => {
    return [...COUNTRY_CODES].sort((a, b) => a.name.localeCompare(b.name));
  }, []);

  const handleCountrySelect = (countryCode: string) => {
    const country = COUNTRY_CODES.find(c => c.code === countryCode);
    if (country) {
      setSelectedCountry(country);
      const fullNumber = phoneNumber ? `${country.dial} ${phoneNumber}` : country.dial;
      form.setValue('phone', fullNumber, { shouldValidate: true });
    }
    setOpen(false);
  };

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setPhoneNumber(value);
    const fullNumber = value ? `${selectedCountry.dial} ${value}` : selectedCountry.dial;
    form.setValue('phone', fullNumber, { shouldValidate: true });
  };

  return (
    <div className="grid sm:grid-cols-2 gap-6">
      <FormField
        control={form.control}
        name="email"
        render={({ field }) => (
          <FormItem className="flex flex-col">
            <FormLabel className="text-gray-900 dark:text-gray-100 font-medium" htmlFor="email">
              Email Address
              <span className="text-red-700 ml-1">*</span>
            </FormLabel>
            <FormDescription className="text-sm text-muted-foreground mt-0.5 mb-1.5 min-h-[40px]">
              We'll use this to send you updates about your application
            </FormDescription>
            <FormControl>
              <Input 
                {...field}
                type="email"
                id="email"
                placeholder="your.email@example.com"
                autoComplete="email"
                aria-required="true"
                className="h-10 text-foreground placeholder:text-muted-foreground"
              />
            </FormControl>
            <FormMessage className="text-red-700" />
          </FormItem>
        )}
      />
      
      <FormField
        control={form.control}
        name="phone"
        render={({ field }) => (
          <FormItem className="flex flex-col">
            <FormLabel className="text-gray-900 dark:text-gray-100 font-medium" htmlFor="phone">
              Phone Number
              <span className="text-red-700 ml-1">*</span>
            </FormLabel>
            <FormDescription className="text-sm text-muted-foreground mt-0.5 mb-1.5 min-h-[40px]">
              Select country code, then enter your number
            </FormDescription>
            <div className="flex gap-2 items-center">
              <Popover open={open} onOpenChange={setOpen} modal={true}>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    role="combobox"
                    aria-expanded={open}
                    aria-label="Select country code"
                    className="w-[100px] h-10 justify-between px-3 font-normal bg-background border-input"
                    data-testid="select-country-code"
                  >
                    <span className="text-sm text-foreground">
                      {selectedCountry.dial}
                    </span>
                    <ChevronDown className="ml-1 h-4 w-4 shrink-0 opacity-50" />
                  </Button>
                </PopoverTrigger>
                <PopoverContent 
                  className="w-[300px] p-0 bg-background border shadow-lg"
                  align="start"
                  side="bottom"
                  sideOffset={4}
                  avoidCollisions={true}
                  collisionPadding={16}
                >
                  <Command className="bg-background">
                    <CommandInput 
                      placeholder="Search country..." 
                      className="h-10"
                    />
                    <CommandList className="max-h-[280px] overflow-y-auto">
                      <CommandEmpty>No country found.</CommandEmpty>
                      <CommandGroup>
                        {sortedCountries.map((country) => (
                          <CommandItem
                            key={country.code}
                            value={`${country.name} ${country.dial}`}
                            onSelect={() => handleCountrySelect(country.code)}
                            className="flex items-center gap-2 py-2 px-2 cursor-pointer"
                          >
                            <Check
                              className={cn(
                                "h-4 w-4 shrink-0",
                                selectedCountry.code === country.code
                                  ? "opacity-100 text-primary"
                                  : "opacity-0"
                              )}
                            />
                            <span className="font-medium w-14 text-muted-foreground text-sm">
                              {country.dial}
                            </span>
                            <span className="truncate text-sm text-foreground">
                              {country.name}
                            </span>
                          </CommandItem>
                        ))}
                      </CommandGroup>
                    </CommandList>
                  </Command>
                </PopoverContent>
              </Popover>
              <FormControl>
                <Input 
                  type="tel"
                  id="phone"
                  inputMode="tel"
                  value={phoneNumber}
                  onChange={handlePhoneChange}
                  placeholder="123 456 7890"
                  autoComplete="tel-national"
                  aria-required="true"
                  className="flex-1 h-10 text-foreground placeholder:text-muted-foreground"
                  data-testid="input-phone-number"
                />
              </FormControl>
            </div>
            <input type="hidden" {...field} />
            <FormMessage className="text-red-700" />
          </FormItem>
        )}
      />
      
      <FormField
        control={form.control}
        name="socialMedia"
        render={({ field }) => (
          <FormItem className="sm:col-span-2">
            <FormLabel className="text-gray-900 dark:text-gray-100 font-medium" htmlFor="socialMedia">
              Social Media or Website (Optional)
            </FormLabel>
            <FormControl>
              <Input 
                {...field}
                type="text"
                id="socialMedia"
                placeholder="Instagram, Facebook, personal website, etc."
                className="h-10 text-foreground placeholder:text-muted-foreground"
              />
            </FormControl>
            <FormMessage className="text-red-700" />
          </FormItem>
        )}
      />
    </div>
  );
};

export default ContactInfoFields;
