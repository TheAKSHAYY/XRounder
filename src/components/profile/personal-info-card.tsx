import { Check, Loader2, Save } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export type PersonalForm = {
  full_name: string;
  display_name: string;
  bio: string;
  phone: string;
  date_of_birth: string;
  gender: string;
  college: string;
  university: string;
  roll_number: string;
};

export type PersonalErrors = Partial<Record<keyof PersonalForm, string>>;

export function validatePersonal(form: PersonalForm): PersonalErrors {
  const errors: PersonalErrors = {};
  if (form.full_name.trim().length > 0 && form.full_name.trim().length < 2)
    errors.full_name = "Enter at least 2 characters.";
  if (form.full_name.length > 120) errors.full_name = "Keep it under 120 characters.";
  if (form.display_name.length > 60) errors.display_name = "Keep it under 60 characters.";
  if (form.bio.length > 500) errors.bio = "Bio must be 500 characters or fewer.";

  const phone = form.phone.trim();
  if (phone && !/^\+?[0-9 ()-]{7,18}$/.test(phone))
    errors.phone = "Use digits only, 7–18 characters (a leading + is fine).";

  if (form.date_of_birth) {
    const dob = new Date(form.date_of_birth);
    if (Number.isNaN(dob.getTime())) errors.date_of_birth = "Enter a valid date.";
    else if (dob > new Date()) errors.date_of_birth = "Date of birth cannot be in the future.";
    else if (dob < new Date("1940-01-01")) errors.date_of_birth = "Enter a realistic date.";
  }

  if (form.roll_number.length > 40) errors.roll_number = "Keep it under 40 characters.";
  if (form.college.length > 120) errors.college = "Keep it under 120 characters.";
  if (form.university.length > 120) errors.university = "Keep it under 120 characters.";
  return errors;
}

function FieldError({ message }: { message?: string }) {
  if (!message) return null;
  return (
    <p className="text-xs text-destructive" role="alert">
      {message}
    </p>
  );
}

export function PersonalInfoCard({
  form,
  errors,
  email,
  saving,
  saved,
  dirty,
  onChange,
  onSubmit,
  onReset,
}: {
  form: PersonalForm;
  errors: PersonalErrors;
  email: string | null;
  saving: boolean;
  saved: boolean;
  dirty: boolean;
  onChange: (patch: Partial<PersonalForm>) => void;
  onSubmit: (e: React.FormEvent) => void;
  onReset: () => void;
}) {
  return (
    <form
      id="personal"
      onSubmit={onSubmit}
      aria-label="Personal information"
      className="rounded-xl border border-border bg-surface p-4 shadow-soft sm:p-5"
    >
      <div className="grid grid-cols-[minmax(0,1fr)_auto] items-start gap-3">
        <div className="min-w-0">
          <h2 className="text-h3 text-foreground">Personal information</h2>
          <p className="mt-1 text-sm text-muted-foreground">
            Used across your profile, certificates and results.
          </p>
        </div>
        {saved && !dirty && (
          <span className="inline-flex shrink-0 items-center gap-1 rounded-full border border-success/30 bg-success/10 px-2.5 py-1 text-[11px] font-medium text-success">
            <Check className="h-3 w-3" /> Saved
          </span>
        )}
      </div>

      <fieldset disabled={saving} className="mt-4 grid gap-4 sm:grid-cols-2 sm:gap-5">
        <div className="min-w-0 space-y-2">
          <Label htmlFor="full_name">Full name</Label>
          <Input
            id="full_name"
            value={form.full_name}
            onChange={(e) => onChange({ full_name: e.target.value })}
            autoComplete="name"
            aria-invalid={!!errors.full_name}
          />
          <FieldError message={errors.full_name} />
        </div>

        <div className="min-w-0 space-y-2">
          <Label htmlFor="display_name">Display name</Label>
          <Input
            id="display_name"
            value={form.display_name}
            onChange={(e) => onChange({ display_name: e.target.value })}
            autoComplete="nickname"
            aria-invalid={!!errors.display_name}
          />
          <FieldError message={errors.display_name} />
        </div>

        <div className="min-w-0 space-y-2">
          <Label htmlFor="email">Email</Label>
          <Input id="email" value={email ?? ""} readOnly disabled className="bg-muted/50" />
          <p className="text-xs text-muted-foreground">
            Managed by your sign-in account and cannot be edited here.
          </p>
        </div>

        <div className="min-w-0 space-y-2">
          <Label htmlFor="phone">Phone number</Label>
          <Input
            id="phone"
            inputMode="tel"
            value={form.phone}
            onChange={(e) => onChange({ phone: e.target.value })}
            placeholder="+91 98765 43210"
            autoComplete="tel"
            aria-invalid={!!errors.phone}
          />
          <FieldError message={errors.phone} />
        </div>

        <div className="min-w-0 space-y-2">
          <Label htmlFor="dob">Date of birth</Label>
          <Input
            id="dob"
            type="date"
            value={form.date_of_birth}
            onChange={(e) => onChange({ date_of_birth: e.target.value })}
            aria-invalid={!!errors.date_of_birth}
          />
          <FieldError message={errors.date_of_birth} />
        </div>

        <div className="min-w-0 space-y-2">
          <Label htmlFor="gender">Gender</Label>
          <Select
            value={form.gender || undefined}
            onValueChange={(v) => onChange({ gender: v })}
          >
            <SelectTrigger id="gender">
              <SelectValue placeholder="Prefer not to say" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="female">Female</SelectItem>
              <SelectItem value="male">Male</SelectItem>
              <SelectItem value="other">Other</SelectItem>
              <SelectItem value="undisclosed">Prefer not to say</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="min-w-0 space-y-2">
          <Label htmlFor="college">College</Label>
          <Input
            id="college"
            value={form.college}
            onChange={(e) => onChange({ college: e.target.value })}
            placeholder="e.g. Gurukul Institute of Technology"
            aria-invalid={!!errors.college}
          />
          <FieldError message={errors.college} />
        </div>

        <div className="min-w-0 space-y-2">
          <Label htmlFor="university">University</Label>
          <Input
            id="university"
            value={form.university}
            onChange={(e) => onChange({ university: e.target.value })}
            placeholder="e.g. MJPRU"
            aria-invalid={!!errors.university}
          />
          <FieldError message={errors.university} />
        </div>

        <div className="min-w-0 space-y-2">
          <Label htmlFor="roll">Enrollment / roll number</Label>
          <Input
            id="roll"
            value={form.roll_number}
            onChange={(e) => onChange({ roll_number: e.target.value })}
            aria-invalid={!!errors.roll_number}
          />
          <FieldError message={errors.roll_number} />
        </div>

        <div className="min-w-0 space-y-2 sm:col-span-2">
          <Label htmlFor="bio">Short bio</Label>
          <Textarea
            id="bio"
            rows={4}
            value={form.bio}
            onChange={(e) => onChange({ bio: e.target.value })}
            placeholder="Tell others about yourself"
            className="resize-y"
            aria-invalid={!!errors.bio}
          />
          <div className="flex items-center justify-between">
            <FieldError message={errors.bio} />
            <span className="ml-auto text-xs text-muted-foreground tabular-nums">
              {form.bio.length}/500
            </span>
          </div>
        </div>
      </fieldset>

      <div className="mt-5 flex flex-col-reverse gap-2 sm:flex-row sm:justify-end">
        <Button
          type="button"
          variant="ghost"
          className="tap-target w-full sm:w-auto"
          onClick={onReset}
          disabled={saving || !dirty}
        >
          Reset
        </Button>
        <Button type="submit" className="tap-target w-full sm:w-auto" disabled={saving || !dirty}>
          {saving ? (
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          ) : (
            <Save className="mr-2 h-4 w-4" />
          )}
          {saving ? "Saving…" : "Save changes"}
        </Button>
      </div>
    </form>
  );
}
