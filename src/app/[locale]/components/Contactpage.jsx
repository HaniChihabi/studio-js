"use client"
import { useId } from 'react'
import Link from 'next/link'

import { Border } from './Border'
import { Button } from './Button1'
import { Container } from './Container'
import { FadeIn } from './FadeIn'
import { Offices } from './Offices'
import { PageIntro } from './PageIntro'
import { SocialMedia } from './SocialMedia'
import Layout from './Layout';
import { SectionIntro } from './SectionIntro'
import { useTranslations } from 'next-intl'

function TextInput({ label, ...props }) {
  let id = useId()

  return (
    <div className="group relative button-20 z-0 transition-all focus-within:z-10">
      <input
        type="text"
        id={id}
        {...props}
        placeholder=" "
        className="peer block w-full px-6 border border-neutral-300 bg-transparent  pb-4 pt-6 sm:pt-12 text-m text-neutral-950 ring-4 ring-transparent transition focus:border-neutral-950 focus:outline-none focus:ring-neutral-950/5 group-first:rounded-t-2xl group-last:rounded-b-2xl"
        />
      <label
        htmlFor={id}
        className="pointer-events-none  absolute left-6 top-1/2 -mt-3 origin-left text-base/6 text-neutral-500 transition-all duration-200 peer-focus:-translate-y-4 peer-focus:scale-75 peer-focus:font-semibold peer-focus:text-neutral-950 peer-[:not(:placeholder-shown)]:-translate-y-4 peer-[:not(:placeholder-shown)]:scale-75 peer-[:not(:placeholder-shown)]:font-semibold peer-[:not(:placeholder-shown)]:text-neutral-950"
      >
        {label}
      </label>
    </div>
  )
}

function RadioInput({ label, ...props }) {
  return (
    <div className="flex items-center space-x-4">

    <label className="flex gap-x-3">
      <input
        type="radio"
        {...props}
        className="h-6 w-6 flex-none appearance-none rounded-full border border-neutral-950/20 outline-none checked:border-[0.5rem] checked:border-neutral-950 focus-visible:ring-1 focus-visible:ring-neutral-950 focus-visible:ring-offset-2"
      />
      <span className="text-base/6 text-neutral-950">{label}</span>
    </label>
    </div>
  )
}



export default function Contact() {
  const t = useTranslations("Contact")
  async function handleSubmit(event) {
    event.preventDefault();
    const formData = new FormData(event.target);
    

    formData.append("access_key", "b4f2f349-72aa-480e-b625-78b24cc2aa24");

    const object = Object.fromEntries(formData);
  let errorMessage = '';

  // Checking for empty fields
  if (!object.name) errorMessage += t("inquiriesError.Name") + "\n" ;
  if (!object.email) errorMessage += t("inquiriesError.Email") + "\n";
  if (!object.company) errorMessage += t("inquiriesError.Company") + "\n";
  if (!object.phone) errorMessage += t("inquiriesError.Phone") + "\n";
  if (!object.message) errorMessage += t("inquiriesError.Message") + "\n";

  // Checking for valid email
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (object.email && !emailRegex.test(object.email)) errorMessage += t("inquiriesError.InvalidEmail");

  // If there are errors, alert them and stop the form submission
  if (errorMessage) {
    alert(errorMessage);
    return;
  }
    const json = JSON.stringify(object);
    try {
      const response = await fetch("https://api.web3forms.com/submit", {
          method: "POST",
          headers: {
              "Content-Type": "application/json",
              Accept: "application/json",
          },
          body: json,
      });

      const result = await response.json();
      if (result.success) {
          console.log(result);
          alert('Submission was successful!');
      } else {
          console.error(result);
          alert('Submission failed. Please try again.');
      }
  } catch (error) {
      console.error('Error submitting form:', error);
      alert('An error occurred. Please try again.');
  }
  
}
  return (
    <>
      <Layout>
        
        <Container className="flex items-center justify-center contact-page h-[calc(100vh-10rem)]">
  <div className="grid grid-cols-1 relative bottom-7 top-0 justify-center">
        <FadeIn>
      <form onSubmit={handleSubmit}>
        <h2 className="text-4xl sm:text-6xl flex justify-center font-medium text-neutral-950">
         {t("Work inquiries")}
        </h2>
        <div className="isolate sm:py-10 -space-y-px rounded-2xl bg-white/50 relative pt-10">
          <TextInput label={t("inquiries.Name")} name="name" autoComplete="name" />
          <TextInput
            label={t("inquiries.Email")}
            type="email"
            name="email"
            autoComplete="email"
          />
          <TextInput
            label="Company"
            name="company"
            autoComplete="organization"
          />
          <TextInput label={t("inquiries.Phone")} type="tel" name="phone" autoComplete="tel" />
          <TextInput label={t("inquiries.Message")} name="message" />
          
        </div>
        
        <div className="flex justify-center pt-0">
          <Button type="submit" className="justify-center">
            {t("Work together")}
          </Button>
        </div>
        <div className="mt-4 w-full flex justify-center">
            <SocialMedia />
          </div>
      </form>
    </FadeIn>
        </div>
      </Container>
      </Layout>
    </>
  )
}
