import { OPENING_HOURS_SECTIONS } from '../data/openingHours';
import { useLanguage } from '../i18n/LanguageContext';

export default function OpeningHoursContent({
  className = '',
  sectionIds = null,
  allSectionsOpen = false,
  staticSections = false,
}) {
  const { t } = useLanguage();

  const sections =
    sectionIds && sectionIds.length > 0
      ? sectionIds
          .map((id) => OPENING_HOURS_SECTIONS.find((s) => s.id === id))
          .filter(Boolean)
      : OPENING_HOURS_SECTIONS;

  const tableFor = (section) => (
    <table className="opening-hours-table">
      <tbody>
        {section.rows.map((row) => (
          <tr key={`${section.id}-${row.dayKey}`}>
            <th scope="row">{t(`days.${row.dayKey}`)}</th>
            <td>{row.closed ? t('hours.closed') : row.hours}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );

  return (
    <div className={`opening-hours ${className}`.trim()}>
      {sections.map((section, i) =>
        staticSections ? (
          <div
            key={section.id}
            className="opening-hours-section opening-hours-section--static"
          >
            <h3 className="opening-hours-section-title">
              {t(`hours.sections.${section.id}`)}
            </h3>
            {tableFor(section)}
          </div>
        ) : (
          <details
            key={section.id}
            className="opening-hours-section"
            open={allSectionsOpen || i === 0}
          >
            <summary className="opening-hours-summary">
              {t(`hours.sections.${section.id}`)}
            </summary>
            {tableFor(section)}
          </details>
        )
      )}
    </div>
  );
}
