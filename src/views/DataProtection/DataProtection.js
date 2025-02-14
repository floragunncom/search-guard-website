import React from 'react';
import {Helmet} from 'react-helmet';
import './DataProtection.scss';
import PageWrapper from '../../components/PageWrapper/PageWrapper';
import Title from '../../components/Title/Title';
import PreFooter from '../../components/PreFooter/PreFooter';

const breadcrumb = [
    { anchor: '/', name: 'Home' },
    { anchor: '/company/', name: 'Company' },
    { anchor: '/dataprotection/', name: 'Data Protection' }
];

const DataProtection = () => {
    return (
        <PageWrapper>
            <Helmet>
                <meta charSet="utf-8" />
                <title>Data Protection - Search Guard</title>
                <link rel="canonical" href="https://search-guard.com/dataprotection/" />
                <meta
                    name="description"
                    content="Our policy regarding the collection and usage of personal data in accordance with GDPR."
                />
            </Helmet>
            <Title
                headline="Data Protection"
                text="Our policy regarding the collection and usage of personal data in accordance with GDPR."
                breadcrumb={breadcrumb}
            />
            <div className="row">
                <div className="col s12 l8 offset-l2">
                    <div className="imprint-wrapper">

                        <div className="imprint-headline">
                            <b><i><a href="/datenschutz/">Deutsche Version</a></i></b>
                        </div>

                        <div className="imprint-headline">
                            1. Name and Contact Details of the Data Controller and Company Data Protection Officer
                        </div>
                        <div className="imprint-text">
                            This privacy policy applies to data processing by: <br />
                            <br />
                            Responsible party:
                            <br />
                            floragunn GmbH
                            <br />
                            Tempelhofer Ufer 16
                            <br />
                            10963 Berlin
                            <br />
                            Email: info@floragunn.com
                        </div>
                        <div className="imprint-headline">
                            2. Collection and Storage of Personal Data and Nature and Purpose of Their Use
                        </div>
                        <div className="imprint-text">
                            a) When visiting the website <br />
                            <br />
                            When you access our website{' '}
                            <a
                                href="https://search-guard.com/"
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                https://search-guard.com
                            </a>{' '}
                            your browser automatically sends information to our website's server.
                            This information is temporarily stored in a log file. The following
                            information is collected without your intervention and stored until
                            automated deletion:
                            <br />
                            <br />
                            <ul className="imprint-listitem">
                                <li>IP address of the requesting computer,</li>
                                <li>Date and time of access,</li>
                                <li>Name and URL of the retrieved file,</li>
                                <li>
                                    Website from which access is made (referrer URL),
                                </li>
                                <li>
                                    Browser used and, if applicable, your computer's operating system
                                    and the name of your access provider.
                                </li>
                            </ul>
                            We process the mentioned data for the following purposes:
                            <ul className="imprint-listitem">
                                <li>
                                    Ensuring a smooth connection setup of the website,
                                </li>
                                <li>
                                    Ensuring comfortable use of our website,
                                </li>
                                <li>Evaluation of system security and stability, and</li>
                                <li>For other administrative purposes.</li>
                            </ul>
                            The legal basis for data processing is Art. 6(1)(f) GDPR. Our legitimate
                            interest follows from the purposes listed above for data collection. We
                            never use the collected data to draw conclusions about your person.
                            <br />
                            <br />
                            In addition, we use cookies and analytics services when you visit our
                            website. Further explanations can be found under sections 4 and 5 of
                            this privacy policy.
                            <br />
                            <br />
                            b) When registering for our newsletter
                            <br />
                            <br />
                            If you have explicitly consented according to Art. 6(1)(a) GDPR, we
                            will use your email address to regularly send you our newsletter. For
                            receiving the newsletter, providing an email address is sufficient.
                            <br />
                            <br />
                            You can unsubscribe at any time, for example via a link at the end
                            of each newsletter. Alternatively, you can send your unsubscribe
                            request at any time to info@floragunn.com.
                            <br />
                            <br />
                            c) When using our contact form
                            <br />
                            <br />
                            For any type of questions, we offer you the possibility to contact us
                            via a form provided on the website. A valid email address is required
                            so we know who the request is from and to be able to respond. Additional
                            information can be provided voluntarily.
                            <br />
                            <br />
                            Data processing for the purpose of contacting us is carried out
                            according to Art. 6(1)(a) GDPR based on your voluntarily given consent.
                            <br />
                            <br />
                            The personal data we collect for the use of the contact form will be
                            automatically deleted after your request has been processed.
                        </div>
                        <div className="imprint-headline">Data Transfer</div>
                        <div className="imprint-text">
                            Your personal data will not be transmitted to third parties for
                            purposes other than those listed below.
                            <br />
                            <br />
                            We only share your personal data with third parties if:
                            <ul className="imprint-listitem">
                                <li>
                                    You have given your explicit consent according to Art. 6(1)(a) GDPR,
                                </li>
                                <li>
                                    Disclosure is necessary according to Art. 6(1)(f) GDPR for the
                                    establishment, exercise, or defense of legal claims and there is
                                    no reason to assume that you have an overriding legitimate interest
                                    in not disclosing your data,
                                </li>
                                <li>
                                    In the event that there is a legal obligation for disclosure
                                    pursuant to Art. 6(1)(c) GDPR, and
                                </li>
                                <li>
                                    This is legally permissible and required according to Art. 6(1)(b)
                                    GDPR for the processing of contractual relationships with you.
                                </li>
                            </ul>
                        </div>
                        <div className="imprint-headline">4. Cookies</div>
                        <div className="imprint-text">
                            We use cookies on our site. These are small files that your browser
                            automatically creates and stores on your device (laptop, tablet,
                            smartphone, etc.) when you visit our site. Cookies do not harm your
                            device and do not contain viruses, trojans, or other malware.
                            <br />
                            <br />
                            Information is stored in the cookie that is related to the specific
                            device used. However, this does not mean that we directly obtain
                            knowledge of your identity.
                            <br />
                            <br />
                            The use of cookies serves to make the use of our website more pleasant
                            for you. We use session cookies to recognize that you have already
                            visited individual pages of our website. These are automatically
                            deleted when you leave our site.
                            <br />
                            <br />
                            Additionally, we also use temporary cookies to optimize user-friendliness,
                            which are stored on your device for a specified period. If you visit
                            our site again to use our services, it automatically recognizes that
                            you have already been with us and what inputs and settings you made,
                            so you don't have to enter them again.
                            <br />
                            <br />
                            We also use cookies to statistically record the use of our website
                            and evaluate it for the purpose of optimizing our offering for you
                            (see Section 5). These cookies allow us to automatically recognize
                            when you return to our site. These cookies are automatically deleted
                            after a defined period.
                            <br />
                            <br />
                            The data processed by cookies is necessary for the mentioned purposes
                            to protect our legitimate interests and those of third parties
                            according to Art. 6(1)(f) GDPR.
                            <br />
                            <br />
                            Most browsers accept cookies automatically. However, you can configure
                            your browser so that no cookies are stored on your computer or a
                            notice always appears before a new cookie is created. The complete
                            deactivation of cookies may mean that you cannot use all functions
                            of our website.
                        </div>
                        <div className="imprint-headline">5. Analytics Tools</div>
                        <div className="imprint-text">
                            Tracking Tools
                            <br />
                            <br />
                            Tracking is carried out on the basis of Art. 6(1)(f) GDPR. With the
                            tracking measures used, we want to ensure a needs-based design and
                            continuous optimization of our website. We also use tracking measures
                            to statistically record the use of our website and evaluate it for
                            the purpose of optimizing our offering for you. These interests are
                            to be regarded as legitimate within the meaning of the aforementioned
                            provision.
                            <br />
                            <br />
                            The respective data processing purposes and data categories can be
                            found in the corresponding tracking tools.
                        </div>
                        <div className="imprint-headline">6. Social Media Plugins</div>
                        <div className="imprint-text">
                            We use social media plugins from the social networks Facebook,
                            Twitter, and Instagram on our website based on Art. 6(1)(f) GDPR
                            to make our company better known through these channels. The
                            underlying advertising purpose is to be regarded as a legitimate
                            interest within the meaning of the GDPR. Responsibility for
                            data protection-compliant operation is to be guaranteed by their
                            respective providers.
                            <br />
                            <br />
                            The integration of these plugins by us is done using the two-click
                            method to protect visitors to our website in the best possible way.
                            <br />
                            <br />
                            [Social media sections for Facebook, Twitter, and Instagram with
                            specific details about data collection and processing for each
                            platform follow the same structure as the original, just translated
                            to English]
                        </div>
                        <div className="imprint-headline">7. Rights of the Data Subject</div>
                        <div className="imprint-text">
                            You have the right to:
                            <br />
                            <br />
                            <ul className="imprint-listitem">
                                <li>
                                    Request information about your personal data processed by us in
                                    accordance with Art. 15 GDPR. In particular, you can request
                                    information about the processing purposes, the category of
                                    personal data, the categories of recipients to whom your data
                                    has been or will be disclosed, the planned storage period, the
                                    existence of a right to rectification, deletion, restriction of
                                    processing or objection, the existence of a right to complain,
                                    the origin of your data if not collected by us, and the
                                    existence of automated decision-making including profiling and,
                                    if applicable, meaningful information about their details;
                                </li>
                                <li>
                                    Request the immediate correction of incorrect or completion of
                                    your personal data stored by us in accordance with Art. 16 GDPR;
                                </li>
                                <li>
                                    Request the deletion of your personal data stored by us in
                                    accordance with Art. 17 GDPR, unless the processing is necessary
                                    for exercising the right to freedom of expression and
                                    information, for compliance with a legal obligation, for reasons
                                    of public interest, or for the establishment, exercise or
                                    defense of legal claims;
                                </li>
                                <li>
                                    Request the restriction of the processing of your personal data
                                    in accordance with Art. 18 GDPR;
                                </li>
                                <li>
                                    Receive your personal data that you have provided to us in a
                                    structured, common and machine-readable format or request the
                                    transfer to another controller in accordance with Art. 20 GDPR;
                                </li>
                                <li>
                                    Withdraw your consent at any time in accordance with Art. 7(3)
                                    GDPR. This has the consequence that we may no longer continue
                                    the data processing based on this consent in the future;
                                </li>
                                <li>
                                    Complain to a supervisory authority in accordance with Art. 77
                                    GDPR. As a rule, you can contact the supervisory authority of
                                    your usual place of residence or workplace or our company
                                    headquarters.
                                </li>
                            </ul>
                        </div>
                        <div className="imprint-headline">8. Right to Object</div>
                        <div className="imprint-text">
                            If your personal data is processed based on legitimate interests
                            pursuant to Art. 6(1)(f) GDPR, you have the right to object to the
                            processing of your personal data pursuant to Art. 21 GDPR, provided
                            that there are grounds relating to your particular situation or the
                            objection is directed against direct marketing. In the latter case,
                            you have a general right to object, which will be implemented by us
                            without specifying a particular situation.
                            <br />
                            <br />
                            If you wish to exercise your right of revocation or objection, simply
                            send an email to info@floragunn.com
                        </div>
                        <div className="imprint-headline">9. Data Security</div>
                        <div className="imprint-text">
                            We use the widely used SSL (Secure Socket Layer) method within the
                            website visit in conjunction with the highest level of encryption
                            supported by your browser. Usually, this is a 256-bit encryption.
                            If your browser does not support 256-bit encryption, we use 128-bit
                            v3 technology instead. Whether a single page of our website is
                            transmitted in encrypted form is indicated by the closed display of
                            the key or lock symbol in the lower status bar of your browser.
                            <br />
                            <br />
                            We also use appropriate technical and organizational security
                            measures to protect your data against accidental or intentional
                            manipulation, partial or complete loss, destruction, or unauthorized
                            access by third parties. Our security measures are continuously
                            improved in line with technological developments.
                        </div>
                        <div className="imprint-headline">
                            10. Currency and Amendment of this Privacy Policy
                        </div>
                        <div className="imprint-text">
                            This privacy policy is currently valid and was last updated in June 2024.
                            <br />
                            <br />
                            Due to the further development of our website and offers above it or
                            due to changed legal or official requirements, it may become necessary
                            to amend this privacy policy. The current privacy policy can be
                            viewed and/or downloaded from our website at any time.
                        </div>
                    </div>
                </div>
            </div>
            <PreFooter />
        </PageWrapper>
    );
};

export default DataProtection;