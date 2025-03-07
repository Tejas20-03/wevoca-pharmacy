import BoxTitle from '@/components/BoxTitle/Box-title';
import { getFaqsReturn } from '@/services/faqs-data/services';
import { GetFaqs_About_ResponseDataType } from '@/services/faqs-data/types';
import React, { useEffect, useState } from 'react';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Arrowbottom from '@/containers/svg-icons/arrow-bottom';
import { Typography } from '@mui/material';




const FaqReturn: React.FC = () => {
    const [faqReturn, setFaqReturn] = useState<GetFaqs_About_ResponseDataType[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [expanded, setExpanded] = React.useState<string | false>(false);

    const handleChange =
        (panel: string) => (event: React.SyntheticEvent, isExpanded: boolean) => {
            setExpanded(isExpanded ? panel : false);
        };
    const faqFunc = async () => {
        try {
            const response = await getFaqsReturn({ token: '' });

            if (response) {
                setFaqReturn(response);
                setLoading(false);
            } else {
                faqFunc();
            }
        } catch (error) {
            console.error('Error fetching FAQs:', error);
            setLoading(false);
        }
    }

    useEffect(() => {
        faqFunc();
    }, []);

    return (
        <div className="grid_items">
            <BoxTitle boxTitle='Returns' />
            <div>
                {faqReturn?.length > 0 && faqReturn.map((data, index) => (
                    <Accordion key={index} expanded={expanded === `panel${index}`} onChange={handleChange(`panel${index}`)} className='faq-accordion' style={{ boxShadow: "none", width: "100%" }}>
                        <AccordionSummary
                            expandIcon={<Arrowbottom color='var(--text-color-lighter)' />}
                            aria-controls="panel1bh-content"
                            id="panel1bh-header"
                            className='accordion-header' >
                            <Typography variant="body2" component="h2">{data.title}</Typography>
                        </AccordionSummary>
                        <AccordionDetails className='accordion-content'>
                            <p></p>
                            <Typography variant="body2" component="div" dangerouslySetInnerHTML={{ __html: `${data.content}` }}></Typography>
                        </AccordionDetails>
                    </Accordion>
                ))}
            </div>
        </div>
    );
};

export default FaqReturn;