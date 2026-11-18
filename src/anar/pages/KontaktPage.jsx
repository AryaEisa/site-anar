import { useEffect, useMemo, useState } from 'react';
import { useLanguage } from '../i18n/LanguageContext';

const CONTACT_EMAIL = 'info@anarrestaurang.se';

const SUBJECT_OPTIONS = [
  { value: 'rekommendation' },
  { value: 'klagomal' },
  { value: 'forsaljare' },
  { value: 'ovrigt' },
];

export default function KontaktPage() {
  const { t } = useLanguage();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');

  const subjectLabel = useMemo(
    () => (subject ? t(`kontakt.subject.${subject}`) : ''),
    [subject, t]
  );

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  function handleSubmit(e) {
    e.preventDefault();
    const label = subjectLabel || subject;
    const mailSubject = t('kontakt.mailSubject', { label });
    const mailBody = t('kontakt.mailBody', { name, email, label, message });
    window.location.href = `mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent(mailSubject)}&body=${encodeURIComponent(mailBody)}`;
  }

  return (
    <main className="kontakt-page" id="kontakt">
      <div className="kontakt-page-panel">
        <header className="kontakt-page-header">
          <p className="kontakt-page-eyebrow">{t('kontakt.eyebrow')}</p>
          <h1 className="kontakt-page-title">{t('kontakt.h1')}</h1>
          <p className="kontakt-page-intro">{t('kontakt.intro')}</p>
        </header>

        <form className="kontakt-form" onSubmit={handleSubmit}>
          <div className="kontakt-form-field">
            <label htmlFor="kontakt-name">{t('kontakt.name')}</label>
            <input
              id="kontakt-name"
              name="name"
              type="text"
              autoComplete="name"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="kontakt-form-input"
            />
          </div>

          <div className="kontakt-form-field">
            <label htmlFor="kontakt-email">{t('kontakt.email')}</label>
            <input
              id="kontakt-email"
              name="email"
              type="email"
              autoComplete="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="kontakt-form-input"
            />
          </div>

          <div className="kontakt-form-field">
            <label htmlFor="kontakt-subject">{t('kontakt.subject')}</label>
            <select
              id="kontakt-subject"
              name="subject"
              required
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
              className="kontakt-form-select"
            >
              <option value="" disabled>
                {t('kontakt.subjectPlaceholder')}
              </option>
              {SUBJECT_OPTIONS.map((opt) => (
                <option key={opt.value} value={opt.value}>
                  {t(`kontakt.subject.${opt.value}`)}
                </option>
              ))}
            </select>
          </div>

          <div className="kontakt-form-field">
            <label htmlFor="kontakt-message">{t('kontakt.message')}</label>
            <textarea
              id="kontakt-message"
              name="message"
              required
              rows={5}
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              className="kontakt-form-textarea"
            />
          </div>

          <button type="submit" className="kontakt-form-submit">
            {t('kontakt.send')}
          </button>
        </form>
      </div>
    </main>
  );
}
