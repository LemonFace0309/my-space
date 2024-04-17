"use client";

import { AdaptiveImage } from "@/components/adaptive-image";
import { motion } from "framer-motion";
import inboxLight from "public/inbox-light.png";
import inbox from "public/inbox.png";
import invoicingLight from "public/invoicing-light.png";
import invoicing from "public/invoicing.png";
import { useState } from "react";
import { CopyInput } from "@/components/ui/copy-input";

export function SectionFour() {
  const [isActive, setActive] = useState(false);
  const [isActive2, setActive2] = useState(false);

  return (
    <section className="flex justify-between space-y-12 md:space-y-0 md:space-x-8 flex-col md:flex-row overflow-hidden mb-12">
      <div
        className="border border-border basis-1/3 rounded-2xl bg-white dark:bg-[#121212] p-10 md:text-center flex flex-col"
        onMouseEnter={() => setActive2(true)}
        onMouseLeave={() => setActive2(false)}
      >
        <span className="text-primary border border-primary rounded-full self-start font-semibold px-3 text-xs py-1.5 mb-4">
          Coming soon
        </span>
        <h4 className="font-medium text-xl md:text-2xl mb-4">Invoicing</h4>
        <p className="text-[#878787]">
          We’re working hard to give you the best invoice solution. It will
          feature web based invoices, live collaboration and project sync.
        </p>
        <motion.div
          animate={isActive2 ? { y: -5 } : { y: 0 }}
          initial={{ y: -5 }}
          transition={{ type: "spring", stiffness: 100 }}
          className="mt-8 md:mt-auto"
        >
          <AdaptiveImage
            darkSrc={invoicing}
            lightSrc={invoicingLight}
            quality={100}
            className="object-contain"
            alt="Invoice"
          />
        </motion.div>
      </div>

      <div
        className="border border-border md:basis-2/3 rounded-2xl bg-white dark:bg-[#121212] p-10 flex justify-between md:space-x-8 md:flex-row flex-col"
        onMouseEnter={() => setActive(true)}
        onMouseLeave={() => setActive(false)}
      >
        <div className="flex flex-col md:basis-1/2">
          <h4 className="font-medium text-xl md:text-2xl mb-4">Magic inbox</h4>

          <p className="text-[#878787] mb-4">
            Automatic matching of incoming invoices or receipts to the right
            transaction.
          </p>

          <ul className="list-decimal pl-4 space-y-3">
            <li className="text-[#878787]">
              Use your personalized email address for your invoices and
              receipts.
            </li>
            <li className="text-[#878787]">
              The invoice arrives in the inbox, with our AI solution the invoice
              automatically matches with the right transaction.
            </li>
            <li className="text-[#878787]">
              Your transaction now have the right basis/attachments for you to
              export.
            </li>
          </ul>

          <CopyInput
            value="inbox.f3f1s@midday.ai"
            className="max-w-[240px] mt-8"
          />
        </div>

        <div className="md:basis-1/2 mt-8 md:mt-0 -bottom-[8px] relative">
          <motion.div
            animate={isActive ? { y: -5 } : { y: 0 }}
            initial={{ y: -5 }}
            transition={{ type: "spring", stiffness: 100 }}
          >
            <AdaptiveImage
              darkSrc={inbox}
              lightSrc={inboxLight}
              quality={100}
              className="object-contain"
              alt="Inbox"
            />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
