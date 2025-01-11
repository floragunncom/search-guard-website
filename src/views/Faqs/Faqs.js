import React from 'react';
import {Helmet} from 'react-helmet';
import {HashLink as Anchor} from 'react-router-hash-link';
import PageWrapper from '../../components/PageWrapper/PageWrapper';
import PreFooter from '../../components/PreFooter/PreFooter';
import Title from '../../components/Title/Title';
import pages from '../../Api/pagecontent/pages.json';
import Markdown from 'markdown-to-jsx';
import slugify from 'react-slugify';
import './Faqs.scss';
import CTAContactUs from "../../components/CTA/CTAContactUs";

const breadcrumb = [
    {anchor: '/', name: 'Home'},
    {anchor: '/resource/', name: 'Resources'},
    {anchor: '/faq/', name: 'FAQ'},
];

let faqPage = pages.filter(page => page.sys.contentType.sys.id === "pageFaq")[0];
const Faqs = () => {

    var htmlTags = /(<([^>]+)>)/ig;
    var newlines = /(\r\n|\n|\r)/gm;
    var whitespaces = /  +/g;
    let jsonld = {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        "mainEntity": []
    };

    faqPage.fields.categories.map(category => {
        category.fields.entries.map(faqItem => {
            let faqLd = {
                "@type": "Question"
            };

            faqLd["name"] = faqItem.question;

            let answer = {
                "@type": "Answer"
            };

            answer["text"] = faqItem.fields.answer.toString().replace(htmlTags, "").replace(newlines, "").replace(whitespaces, "");
            faqLd["acceptedAnswer"] = answer;
            jsonld.mainEntity.push(faqLd);
        });
    });

    return (
        <PageWrapper>
            <Helmet>
                <html lang="en" itemScope itemType="https://schema.org/FAQPage"/>
                <meta charSet="utf-8"/>
                <title>
                    Frequently asked questions | Search Guard | Security for Elasticsearch
                </title>
                <link rel="canonical" href="https://search-guard.com/faq/"/>
                <meta
                    name="description"
                    content="Find answers to frequently asked questions about Search Guard, the rock-solid and battle proven security suite for Elasticsearch."
                />
            </Helmet>
            <Title
                headline="Frequently asked questions"
                text="Find answers to the most frequently asked questions about Search Guard and Signals."
                breadcrumb={breadcrumb}
            />
            <div className="row faq-row-wrapper">
                <div className="col s12 l4">
                    {faqPage.fields.categories.map(category => {
                        return (
                            <div className="faq-question-section">
                                <div className="faq-question-headline">{category.fields.title}</div>
                                {category.fields.entries.map(faq => {
                                    return (
                                        <div className="faq-question-text">
                                            <Anchor
                                                to={`/faq/#${slugify(faq.fields.question)}`}>{faq.fields.question}</Anchor>
                                        </div>
                                    );
                                })}
                            </div>
                        );
                    })}
                </div>
                <div className="col s12 l7 offset-l1 faq-answer-wrapper">
                    {faqPage.fields.categories.map(category => {
                        return (
                            <div className="faq-answer-section">
                                <div className="faq-answer-section-headline">
                                    {category.fields.title}
                                </div>
                                {category.fields.entries.map(faq => {
                                    return (
                                        <div
                                            id={`${slugify(faq.fields.question)}`}
                                            itemScope
                                            itemProp="mainEntity"
                                            itemType="https://schema.org/Question"
                                        >
                                            <div
                                                className={`subtitle faq-answer-headline ${faq.paddingClass}`}
                                                itemProp="name"
                                            >
                                                {faq.fields.question}
                                            </div>
                                            <div
                                                itemScope
                                                itemProp="acceptedAnswer"
                                                itemType="https://schema.org/Answer"
                                            >
                                                <div className="faq-answer-text" itemProp="text">
                                                    <Markdown>
                                                        {faq.fields.answer}
                                                    </Markdown>

                                                </div>
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>
                        );
                    })}
                </div>
            </div>
            <CTAContactUs colorschema="white"/>
            <PreFooter/>
        </PageWrapper>
    );
};

export default Faqs;
