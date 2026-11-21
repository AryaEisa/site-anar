import { BooqyWordmark } from '../../shared/BooqyWordmark';

/**
 * "Drivs av Booqy" längst ned i panelen med kitets flöden (boka bord, beställ avhämtning,
 * catering m.fl.), eftersom det är Booqy som driver just de delarna. Inte i sidfoten.
 */
export default function PoweredByBooqy() {
  return (
    <p className="kit-panel-credit">
      Drivs av{' '}
      <span translate="no">
        <BooqyWordmark className="kit-panel-booqy" />
      </span>
    </p>
  );
}
