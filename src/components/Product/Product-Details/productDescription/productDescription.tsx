import Buttons from '@/components/Button/Buttons';
import style from '@/components/Product/Product-Details/productDescription/productDescription.module.scss';
import useWindowDimensions from '@/hooks/useWindowDimensions';
import { Box, Typography } from '@mui/material';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

interface Props {
  productTitle?: string;
}

const ProductDescription: React.FC<Props> = ({ productDetailDescription, howItWorks, description, productTitle }) => {
  const [activeSection, setActiveSection] = useState(null);
  const { width: windowWidth } = useWindowDimensions();
  const router = useRouter();
  useEffect(() => {
    setActiveSection(null)
  }, [router.query?.ProductUrl])
  const handleButtonClick = (sectionTitle) => {
    setActiveSection(sectionTitle);
    scrollToSection(sectionTitle);
  };

  const scrollToSection = (sectionTitle) => {
    const headerHeight = windowWidth > 575 ? 220 : 188;
    const sectionElement = document.getElementById(sectionTitle);
    if (sectionElement) {
      const scrollToY = sectionElement.getBoundingClientRect().top + window.scrollY - headerHeight;
      window.scrollTo({ top: scrollToY, behavior: 'smooth' });
    }
  };
  function toTitleCase(str) {
    return str.replace(/\w\S*/g, function (txt) {
      return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
    });
  }


  return (
    <Box className={style.descriptionSectionGroup}>
      {productDetailDescription?.length ? (
        <div className={style.btnGroup}>
          {productDetailDescription[0] &&
            (() => {
              let hasValues = false; // Flag to track if any section has values

              const renderedButtons = Object.entries(productDetailDescription[0]).map(([sectionTitle], key) => {
                const sectionContent = productDetailDescription[0][sectionTitle];
                const sectionHasValues = Object.values(sectionContent).some((value) => value);

                if (sectionHasValues) {
                  hasValues = true; // Set flag to true if any section has values

                  return (
                    <Buttons key={key} btnClickFunction={() => handleButtonClick(sectionTitle)} btnClass={`primary btn-half-rounded ${activeSection === sectionTitle ? style.active : ''}`}>
                      {sectionTitle}
                    </Buttons>
                  );
                }
                return null;
              });

              return renderedButtons;
            })()}
        </div>
      ) : (
        ''
      )}
      <div className={style.descriptionWrapper}>
          {(() => {
            let hasValues = false; // Flag to track if any section has values
            if (productDetailDescription?.length) {
              const renderedSections = Object.entries(productDetailDescription[0]).map(([sectionTitle, sectionContent], key) => {
                
                const sectionHasValues = Object.values(sectionContent).some((value) => value);
                if (sectionHasValues) {
                  hasValues = true;
                  return (
                    <div id={sectionTitle} key={key} className={style.descriptionWrapper2}>
                      <Typography className={style.productTitle} variant="body1" component="h1">
                        {productTitle} {toTitleCase(sectionTitle)}
                      </Typography>
                      {Object.entries(sectionContent).map(([subSectionTitle, subSectionContent], subKey) => {
                        if (subSectionContent) {
                          hasValues = true;
                          return (
                            <div className={style.descriptionWrapper3} key={subKey}>
                              <Typography className={style.productSubTitle} variant="body1" component="h1">
                                {subSectionTitle}
                              </Typography>
                              <p>{subSectionContent}</p>
                            </div>
                          );
                        }
                      })}
                    </div>
                  );
                }
              });
              return renderedSections;  
            }
            if (!hasValues) {
              return (
                <>
                  {howItWorks && (
                    <div className={style.descriptionWrapper2}>
                      <Typography className={style.productTitle} variant="body1" component="h1">
                      {productTitle?.split(' ').splice(0, 1)?.join(' ')} {productTitle?.split(' ')?.slice(1,2).join(' ').toLowerCase() === 'test' ? 'Test': `${productTitle?.split(' ')?.slice(1,2).join(' ')} Test`}  How it works
                      </Typography>
                      <div className={style.descriptionWrapper3}>
                        <Typography variant="body2" component="div" dangerouslySetInnerHTML={{ __html: `${howItWorks}` }}></Typography>
                      </div>
                    </div>
                  )}
                  {description && (
                    <div className={style.descriptionWrapper2}>
                      <Typography className={style.productTitle} variant="body1" component="h1">
                      {productTitle} Description
                      </Typography>
                      <div className={style.descriptionWrapper3}>
                        <Typography variant="body2" component="div" dangerouslySetInnerHTML={{ __html: `${description}` }}></Typography>
                      </div>
                    </div>
                  )}
                </>
              );
            }
          })()}
      </div>
    </Box>
  );
};

export default ProductDescription;
