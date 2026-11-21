import { useId, useState } from 'react';
import { useLocationInfo, useSite } from '@bookingsystemadvancedorg/site-kit';
import { dinnerRows, hasHours, lunchRows, restaurantRows } from '../data/openingHours';
import { useLanguage } from '../i18n/LanguageContext';

/**
 * Allt kommer från platsen i Booqy: veckotiderna (restaurangen, avhämtningen, och
 * lunch och middag som samma pass delade vid 16:00, se data/openingHours.js) och
 * de avvikande dagarna.
 */
function useHoursSections() {
  const { location } = useSite();
  const { specialDays } = useLocationInfo();
  const restaurant = restaurantRows(location.businessHours);
  const lunch = lunchRows(location.businessHours);
  const dinner = dinnerRows(location.businessHours);
  return [
    { id: 'restaurant', rows: restaurant },
    ...(location.ordering?.pickup ? [{ id: 'avhamtning', rows: restaurant }] : []),
    ...(hasHours(lunch) ? [{ id: 'lunch', rows: lunch }] : []),
    ...(hasHours(dinner) ? [{ id: 'middag', rows: dinner }] : []),
    ...(specialDays.length
      ? [{ id: 'special', rows: specialDays.map((d) => ({ dayKey: d.date, label: d.label, hours: d.text })) }]
      : []),
  ];
}

/**
 * Tre lägen:
 *  - standard: en <details> per lista (den första öppen)
 *  - staticSections: alla listor synliga med rubrik (rutan på dator)
 *  - accordion: en rubrik per lista som öppnar den, och högst en öppen åt gången
 *    (öppettiderna längst ned på mobil)
 *
 * @param {{ className?: string, sectionIds?: string[] | null, allSectionsOpen?: boolean,
 *   staticSections?: boolean, accordion?: boolean }} props
 */
export default function OpeningHoursContent({
  className = '',
  sectionIds = null,
  allSectionsOpen = false,
  staticSections = false,
  accordion = false,
}) {
  const { t } = useLanguage();
  const all = useHoursSections();
  const baseId = useId();
  const [openId, setOpenId] = useState(null);

  const sections =
    sectionIds && sectionIds.length > 0
      ? sectionIds.map((id) => all.find((s) => s.id === id)).filter(Boolean)
      : all;

  const tableFor = (section) => (
    <table className="opening-hours-table">
      <tbody>
        {section.rows.map((row) => (
          <tr key={`${section.id}-${row.dayKey}`}>
            <th scope="row">{row.label ?? t(`days.${row.dayKey}`)}</th>
            <td>{row.closed ? t('hours.closed') : row.hours}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );

  if (accordion) {
    return (
      <div className={`opening-hours opening-hours--accordion ${className}`.trim()}>
        {sections.map((section) => {
          const open = openId === section.id;
          const buttonId = `${baseId}-${section.id}-button`;
          const panelId = `${baseId}-${section.id}-panel`;
          return (
            <div key={section.id} className={`opening-hours-acc${open ? ' is-open' : ''}`}>
              <h3 className="opening-hours-acc-heading">
                <button
                  type="button"
                  id={buttonId}
                  className="opening-hours-acc-button"
                  aria-expanded={open}
                  aria-controls={panelId}
                  onClick={() => setOpenId(open ? null : section.id)}
                >
                  {t(`hours.sections.${section.id}`)}
                </button>
              </h3>
              <div className="opening-hours-acc-panel" id={panelId} role="region" aria-labelledby={buttonId}>
                <div className="opening-hours-acc-inner">
                  <dl className="opening-hours-acc-list">
                    {section.rows.map((row) => (
                      <div className="opening-hours-acc-row" key={`${section.id}-${row.dayKey}`}>
                        <dt>{row.label ?? t(`days.${row.dayKey}`)}</dt>
                        <dd>{row.closed ? t('hours.closed') : row.hours}</dd>
                      </div>
                    ))}
                  </dl>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    );
  }

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
