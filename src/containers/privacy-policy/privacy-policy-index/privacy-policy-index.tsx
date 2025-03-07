import React from "react";
import BreadCrumb from "@/components/Bread-crumb/BreadCrumb";
import PageWithBanner from "@/components/page-banner/page-with-banner";
import style from "./privacy-policy-index.module.scss";
import { useLanguage } from "@/language-context/LanguageContext";
import { useQuery } from "@tanstack/react-query";
import { GetTranslatedData } from "@/services/footer/services";
import Cookies from "js-cookie";

const PrivacyPolicyIndex: React.FC = () => {
  const { language } = useLanguage();

  const { data: translatedData } = useQuery(
    ["complain-form"],
    async () => {
      return await GetTranslatedData({ token: "" });
    },
    {
      retry: (failureCount, error) => {
        const token = Cookies.get("auth-token");
        return !token;
      },
      retryDelay: 0,
      staleTime: 600000,
    }
  );

  const getText = (value: string) => {
    const translatedItems = translatedData?.Data || [];
    const item = translatedItems.find((item: any) => item.Value === value);
    return language === "ar" ? item?.Arabic : item?.English;
  };
  return (
    <PageWithBanner removeSideSpacing={style.pageSpacing}>
      <BreadCrumb FourthLink={getText("Privacy-Policy")} classes="deal-breadcrumb" />
      <div className="privacy-policy-index_policyBox__Mwgnm MuiBox-root css-0">
        <div>
          <div className="MuiTypography-root MuiTypography-body2 css-hfgk04-MuiTypography-root">
            <ul>
              <li>
                This Privacy Policy describes how your personal information is
                collected, used, and shared when you visit or make a purchase
                from temp.pk or use our mobile app on Android or iOS.
              </li>
              <li>
                We know that you care how information about you is used and
                shared, and we appreciate your trust in us.This policy will
                illustrate the information that is gathered, the protection
                techniques of such information, as well as the uses of the
                information you provide to us.The privacy policy is subject to
                change without notice, hence it must be reviewed at regular
                intervals to stay updated.
              </li>
              <li>
                By using TEMP services, you are consenting to the practices
                described in this privacy policy.
              </li>
            </ul>
          </div>
        </div>
        <div>
          <h2 className="MuiTypography-root MuiTypography-body2 Box-title_boxTitle__qRM0E undefined css-hfgk04-MuiTypography-root">
            Collection of Personal Data
          </h2>
          <div className="MuiTypography-root MuiTypography-body2 css-hfgk04-MuiTypography-root">
            <ul>
              <li>
                We and our service providers collect Personal Data in a variety
                of ways,including:
              </li>
              <li>Through the Services</li>
              <li>
                We collect personal information from you when you order goods or
                services from us, using our website or app.We also collect
                information when you complete any customer survey.
              </li>
              <li>Offline</li>
              <li>We collect Personal Data from you offline,for example: </li>
              <li>
                When you place an order over the phone,contact our customer
                services or reach out to us with any other inquiry
              </li>
              <li>
                When you participate in our programs or activities or provide
                data at industry events
              </li>
              <li>When you participate in an offline promotion at stores</li>
              <li>
                {" "}
                When you or someone on your behalf reports an adverse event with
                respect to one of our products.
              </li>
            </ul>
          </div>
        </div>
        <div>
          <h2 className="MuiTypography-root MuiTypography-body2 Box-title_boxTitle__qRM0E undefined css-hfgk04-MuiTypography-root">
            Use of Personal Data
          </h2>
          <div className="MuiTypography-root MuiTypography-body2 css-hfgk04-MuiTypography-root">
            <ul>
              <li>
                We and our service providers use Personal Data for legitimate
                business purposes when we interact with consumers, the
                public,professionals and our customers,including
              </li>
              <li> Providing the Services and fulfilling your requests.</li>
              <li>
                To provide the Services to you, such as arranging access to an
                account you set up with us.
              </li>
              <li>
                To respond to your inquiries and fulfill your requests, when you
                contact us via online platform, by telephone or otherwise,for
                example, when you send us queries, suggestions, compliments, or
                complaints.
              </li>
              <li>
                To send administrative information to you, such as changes to
                our terms, conditions, and policies.
              </li>
              <li>To provide you with customer service.</li>
              <li>
                Providing you with information about our products and/or other
                marketing materials.
              </li>
              <li>
                To send you marketing related emails, with information about our
                services,products, and other news about us
              </li>
              <li>
                Analysis of Personal Data for business reporting and providing
                personalized services.
              </li>
              <li>
                To analyze or predict your preferences in order to prepare
                aggregated trend reports on how our digital content is used.
              </li>
              <li>
                To better understand you, so that we can personalize our
                interactions with you and provide you with information and/or
                offers tailored to your interests.
              </li>
              <li>
                To better understand your preferences so that we can deliver
                content via our Services that we believe will be relevant and
                interesting to you.
              </li>
              <li>Accomplishing our business purposes.</li>
              <li>
                For audits, to verify that our internal processes function as
                intended and are compliant with legal, regulatory,or contractual
                requirements.
              </li>
              <li>
                For fraud and security monitoring purposes,for example, to
                detect and prevent cyber - attacks or attempts to commit
                identity theft.
              </li>
              <li>For developing new products and services.</li>
              <li>
                For enhancing, improving, or modifying our current products and
                services.
              </li>
              <li>
                For identifying usage trends,for example,understanding which
                parts of our Services are of most interest to users.
              </li>
              <li>
                For determining the effectiveness of our promotional campaigns,
                so that we can adapt our campaigns to the needs and interests of
                our users.
              </li>
              <li>For operating and expanding our business activities.</li>
            </ul>
          </div>
        </div>
        <div>
          <h2 className="MuiTypography-root MuiTypography-body2 Box-title_boxTitle__qRM0E undefined css-hfgk04-MuiTypography-root">
            Request access or change your information
          </h2>
          <div className="MuiTypography-root MuiTypography-body2 css-hfgk04-MuiTypography-root">
            <ul>
              <li>
                If you would like to review,correct,update,suppress,restrict,or
                delete Personal Data that you have previously provided to
                us,object to the processing of your data, or if you would like
                to request to receive an electronic copy of your Personal Data,
                you may contact us by contacting our customer services at{" "}
                <a href="mailto:feedback@WeVoca.pk">feedback@temp.pk.</a> or on
                our helpline <a href="tel:02111138246">02111138246</a> or by
                accessing the My account page on our app and we will not use
                your information in any way.
              </li>
            </ul>
          </div>
        </div>
        <div>
          <h2 className="MuiTypography-root MuiTypography-body2 Box-title_boxTitle__qRM0E undefined css-hfgk04-MuiTypography-root">
            Other Data
          </h2>
          <div className="MuiTypography-root MuiTypography-body2 css-hfgk04-MuiTypography-root">
            <ul>
              <li>
                Other Data is any data that does not reveal your specific
                identity or does not directly relate to an identifiable
                individual:{" "}
              </li>
              <li>Browser and device data</li>
              <li>App usage data</li>
              <li>
                Data collected through cookies,pixel tags, and other
                technologies
              </li>
              <li>
                Demographic and other data provided by you that does not reveal
                your specific identity
              </li>
              <li>
                Data that has been aggregated in a manner such that it no longer
                reveals your specific identity
              </li>
            </ul>
          </div>
        </div>
        <div>
          <h2 className="MuiTypography-root MuiTypography-body2 Box-title_boxTitle__qRM0E undefined css-hfgk04-MuiTypography-root">
            Collection of Other Data
          </h2>
          <div className="MuiTypography-root MuiTypography-body2 css-hfgk04-MuiTypography-root">
            <ul>
              <li>
                We and our service providers may collect Other Data in a variety
                of ways,including:{" "}
              </li>
              <li>Through your browser or device</li>
              <li>
                you download and use an App, we and our service providers may
                track and collect App usage data, such as the date and time the
                App on your device accesses our servers and what data and files
                have been downloaded to the App based on your device number.
              </li>
            </ul>
          </div>
        </div>
        <div>
          <h2 className="MuiTypography-root MuiTypography-body2 Box-title_boxTitle__qRM0E undefined css-hfgk04-MuiTypography-root">
            Cookies and Google Analytics
          </h2>
          <div className="MuiTypography-root MuiTypography-body2 css-hfgk04-MuiTypography-root">
            <ul>
              <li>
                Cookies are small text files that are placed on your computer by
                websites that you visit.They are widely used in order to make
                websites work,or work more efficiently,as well as to provide
                information to the owners of the site.
              </li>
              <li>
                This website uses Google Analytics, a web analytics service
                provided by Google,Inc. Google Analytics uses cookies, which are
                text files saved on your computer, to help the website analyze
                how you use the site.The information generated by the cookie
                about your use of the website will be transmitted to and stored
                by Google on servers in the United States.Google will use this
                information for the purpose of evaluating your use of the
                website, compiling reports on website activity for website
                operators and providing other services relating to website
                activity and internet usage.Google will not associate your IP
                address with any other data held by Google.You may refuse the
                use of cookies by selecting the appropriate settings on your
                browser, however please note that if you do this you may not be
                able to use the full functionality of this website.By using this
                website, you consent to the processing of data about you by
                Google in the manner and for the purposes set out above.
              </li>
              <li>
                Most web browsers allow some control of most cookies through the
                browser settings.To find out more about cookies,including how to
                see what cookies have been set and how to manage and delete
                them, visit www.allaboutcookies.org.
              </li>
              <li>Other Websites</li>
              <li>
                Our website may have links to other third party sites.This
                privacy policy only applies to this website.You should therefore
                read the privacy policies of the other sites when you are using
                them.
              </li>
            </ul>
          </div>
        </div>
        <div>
          <h2 className="MuiTypography-root MuiTypography-body2 Box-title_boxTitle__qRM0E undefined css-hfgk04-MuiTypography-root">
            Data Retention
          </h2>
          <div className="MuiTypography-root MuiTypography-body2 css-hfgk04-MuiTypography-root">
            <ul>
              <li>
                When you place an order through the Site, we will maintain your
                Order Information for our records unless and until you ask us to
                delete this information.
              </li>
            </ul>
          </div>
        </div>
        <div>
          <h2 className="MuiTypography-root MuiTypography-body2 Box-title_boxTitle__qRM0E undefined css-hfgk04-MuiTypography-root">
            Changes
          </h2>
          <div className="MuiTypography-root MuiTypography-body2 css-hfgk04-MuiTypography-root">
            <ul>
              <li>
                We may update this privacy policy from time to time in order to
                reflect,for example, changes to our practices or for other
                operational, legal or regulatory reasons.
              </li>
            </ul>
          </div>
        </div>
        <div>
          <h2 className="MuiTypography-root MuiTypography-body2 Box-title_boxTitle__qRM0E undefined css-hfgk04-MuiTypography-root">
            Contacting Us
          </h2>
          <div className="MuiTypography-root MuiTypography-body2 css-hfgk04-MuiTypography-root">
            <ul>
              <li>
                If you have any queries about this Privacy Policy, please
                contact <a href="mailto:feedback@WeVoca.pk">feedback@temp.pk.</a>
              </li>
            </ul>
          </div>
        </div>
        <div>
          <h2 className="MuiTypography-root MuiTypography-body2 Box-title_boxTitle__qRM0E undefined css-hfgk04-MuiTypography-root">
            Minor
          </h2>
          <div className="MuiTypography-root MuiTypography-body2 css-hfgk04-MuiTypography-root">
            <ul>
              <li>
                This web site is not intended for individuals under the age of
                18 years
              </li>
            </ul>
          </div>
        </div>
      </div>
    </PageWithBanner>
  );
};

export default PrivacyPolicyIndex;
