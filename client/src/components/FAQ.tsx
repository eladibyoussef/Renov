import React, { useRef, useState } from 'react';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

const FAQComponent: React.FC = () => {
    const searchFieldRef = useRef<HTMLInputElement>(null);
    const [search, setSearch] = useState<string>('');

    function closeTreactPopup(): void {
        const popupElement = document.querySelector<HTMLElement>(".treact-popup");
        if (popupElement) {
            popupElement.classList.add("hidden");
        }
    }

    function openTreactPopup(): void {
        const popupElement = document.querySelector<HTMLElement>(".treact-popup");
        if (popupElement) {
            popupElement.classList.remove("hidden");
        }
    }

    document.querySelector<HTMLElement>(".close-treact-popup")?.addEventListener("click", closeTreactPopup);
    setTimeout(openTreactPopup, 3000);

    const handleSearchKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
        if (event.key === '/') {
            event.preventDefault();
            if (searchFieldRef.current) {
                searchFieldRef.current.focus();
            }
        }
    };

    return (
        <article id="the-article">
            <div className="mx-auto max-w-6xl">
                <div className="p-2 rounded">
                    <div className="flex flex-col md:flex-row">
                        <div className="md:w-1/3 p-4 text-sm">
                            <div className="sticky inset-x-0 top-0 left-0 py-12">
                                <div className="text-3xl text-blue-800 mb-8">Frequently asked questions.</div>
                                <div className="mb-2">Lorem Ipsum ?</div>
                                <div className="text-xs text-gray-600">See our FAQ for more details</div>
                                <div className="relative text-gray-600 mt-8 lg:mr-16">
                                    <input
                                        ref={searchFieldRef}
                                        value={search}
                                        onChange={(e) => setSearch(e.target.value)}
                                        onKeyDown={handleSearchKeyDown}
                                        type="search"
                                        name="search"
                                        placeholder="Search"
                                        className="bg-white w-full h-10 px-5 rounded-full text-sm focus:outline-none"
                                    />
                                    <button type="submit" className="focus:outline-none absolute right-0 top-0 mt-3 mr-4">
                                        <svg
                                            className="h-4 w-4 fill-current"
                                            xmlns="http://www.w3.org/2000/svg"
                                            xmlnsXlink="http://www.w3.org/1999/xlink"
                                            version="1.1"
                                            id="Capa_1"
                                            x="0px"
                                            y="0px"
                                            viewBox="0 0 56.966 56.966"
                                            style={{ enableBackground: 'new 0 0 56.966 56.966' }}
                                            xmlSpace="preserve"
                                            width="512px"
                                            height="512px"
                                        >
                                            <path d="M55.146,51.887L41.588,37.786c3.486-4.144,5.396-9.358,5.396-14.786c0-12.682-10.318-23-23-23s-23,10.318-23,23  s10.318,23,23,23c4.761,0,9.298-1.436,13.177-4.162l13.661,14.208c0.571,0.593,1.339,0.92,2.162,0.92  c0.779,0,1.518-0.297,2.079-0.837C56.255,54.982,56.293,53.08,55.146,51.887z M23.984,6c9.374,0,17,7.626,17,17s-7.626,17-17,17  s-17-7.626-17-17S14.61,6,23.984,6z" />
                                        </svg>
                                    </button>
                                </div>
                            </div>
                        </div>

                        <div className='mt-10'>
                            <Accordion>
                                <AccordionSummary
                                    expandIcon={<ExpandMoreIcon />}
                                    aria-controls="panel1-content"
                                    id="panel1-header"
                                >
                                    Accordion 1
                                </AccordionSummary>
                                <AccordionDetails>
                                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse
                                    malesuada lacus ex, sit amet blandit leo lobortis eget.
                                </AccordionDetails>
                            </Accordion>
                            <Accordion>
                                <AccordionSummary
                                    expandIcon={<ExpandMoreIcon />}
                                    aria-controls="panel2-content"
                                    id="panel2-header"
                                >
                                    Accordion 2
                                </AccordionSummary>
                                <AccordionDetails>
                                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse
                                    malesuada lacus ex, sit amet blandit leo lobortis eget.
                                </AccordionDetails>
                            </Accordion>

                            <Accordion>
                                <AccordionSummary
                                    expandIcon={<ExpandMoreIcon />}
                                    aria-controls="panel1-content"
                                    id="panel1-header"
                                >
                                    Accordion 1
                                </AccordionSummary>
                                <AccordionDetails>
                                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse
                                    malesuada lacus ex, sit amet blandit leo lobortis eget.
                                </AccordionDetails>
                            </Accordion>

                            <Accordion>
                                <AccordionSummary
                                    expandIcon={<ExpandMoreIcon />}
                                    aria-controls="panel1-content"
                                    id="panel1-header"
                                >
                                    Accordion 1
                                </AccordionSummary>
                                <AccordionDetails>
                                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse
                                    malesuada lacus ex, sit amet blandit leo lobortis eget.
                                </AccordionDetails>
                            </Accordion>

                            <Accordion>
                                <AccordionSummary
                                    expandIcon={<ExpandMoreIcon />}
                                    aria-controls="panel1-content"
                                    id="panel1-header"
                                >
                                    Accordion 1
                                </AccordionSummary>
                                <AccordionDetails>
                                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse
                                    malesuada lacus ex, sit amet blandit leo lobortis eget.
                                </AccordionDetails>
                            </Accordion>

                            <Accordion>
                                <AccordionSummary
                                    expandIcon={<ExpandMoreIcon />}
                                    aria-controls="panel1-content"
                                    id="panel1-header"
                                >
                                    Accordion 1
                                </AccordionSummary>
                                <AccordionDetails>
                                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse
                                    malesuada lacus ex, sit amet blandit leo lobortis eget.
                                </AccordionDetails>
                            </Accordion>
                        </div>
                    </div>
                </div>
            </div>
        </article>
    );
};

export default FAQComponent;
