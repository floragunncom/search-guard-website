import React from 'react';
import {Helmet} from 'react-helmet-async';
import { useTranslation } from 'react-i18next';
import {HashLink as Anchor} from 'react-router-hash-link';
import PageWrapper from '../../components/PageWrapper/PageWrapper';
import PreFooter from '../../components/PreFooter/PreFooter';
import Title from '../../components/Title/Title';
import pages from '../../Api/pagecontent/pages.json';
import Markdown from 'markdown-to-jsx';
import slugify from 'react-slugify';
import CTAContactUs from "../../components/CTA/CTAContactUs";

let faqPage = pages.filter(page => page.sys.contentType.sys.id === "pageFaq")[0];
const Faqs = () => {
    const { t } = useTranslation('faq');

    const htmlTags = /(<([^>]+)>)/ig;
    const newlines = /(\r\n|\n|\r)/gm;
    const whitespaces = /  +/g;
    const jsonld = {
        '@context': 'https://schema.org',
        '@type': 'FAQPage',
        mainEntity: []
    };

    faqPage.fields.categories.forEach((category) => {
        category.fields.entries.forEach((faqItem) => {
            const faqLd = {
                '@type': 'Question'
            };

            faqLd.name = faqItem.fields.question;

            const answer = {
                '@type': 'Answer'
            };

            answer.text = faqItem.fields.answer
                .toString()
                .replace(htmlTags, '')
                .replace(newlines, '')
                .replace(whitespaces, '');
            faqLd.acceptedAnswer = answer;
            jsonld.mainEntity.push(faqLd);
        });
    });

    const breadcrumb = [
        {anchor: '/', name: t('breadcrumb.home')},
        {anchor: '/resource/', name: t('breadcrumb.resources')},
        {anchor: '/faq/', name: t('breadcrumb.faq')},
    ];

    return (
        <PageWrapper>
            <Helmet>
                <html itemScope itemType="https://schema.org/FAQPage"/>
                <meta charSet="utf-8"/>
                <title>
                    {t('meta.title')}
                </title>
                <meta
                    name="description"
                    content={t('meta.description')}
                />
                <script type="application/ld+json">
                    {JSON.stringify(jsonld)}
                </script>
            </Helmet>
            <Title
                headline={t('title.headline')}
                text={t('title.text')}
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
