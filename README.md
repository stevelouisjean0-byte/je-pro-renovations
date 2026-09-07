# J&E Pro Renovations LLC

Marketing site for J&E Pro Renovations LLC — a drywall contractor in Orlando,
Florida. 5.0 stars from 8 Google reviews, every one five stars.

- **Address** 5702 Cardinal Guard Ave, Orlando, FL 32839
- **Phone** (407) 364-2107
- **Hours** Opens 8 AM Monday (rest of the week not published — see below)
- **Plus code** FHG6+MR Orlando, Florida

## Pages

| File | Contents |
| --- | --- |
| `index.html` | Opener, joint section detail, figures, four services, the finish levels scale, highlights |
| `work.html` | The six stages in order, the stages on site, ceilings |
| `reviews.html` | Reviews verbatim, rating, topic counts, what the set tells you |
| `contact.html` | Particulars, hours, what changes a quote, FAQ |

Four pages rather than five: a quieter site suits this identity better than a
padded one, and there is only so much a drywall contractor needs to say.

## Design

This site uses **Coastal Electric of Naples' design system**, applied to J&E's
content. Same tokens (verified identical), same type pairing, same component
language:

- deep Gulf navy `#0B2730`, chart teal `#12626F`, sunset amber `#B8801E` on
  pale shell `#F5F4EF`
- **Instrument Serif** over **Manrope**
- centred bands, 1px-gap grids, hairline rules, stat strip
- `assets/chart.js` draws the bathymetric contour hero on canvas; the subpage
  openers carry the static contour SVG

Two things are kept from the drywall build because they are content rather
than styling:

- the **joint section detail**, recoloured onto the teal palette — tape in
  brick, the three coats in deepening teal, still carrying the drafting note
  that vertical scale is exaggerated ×20
- the **board-type colour code** (ivory, green, purple, blue, pink), because
  those colours are data — green board really is green — and they read here as
  a legend, toned to sit with teal and amber

Static HTML, no build step. Google Fonts is the only external request.

## Sourcing

| Claim | Source |
| --- | --- |
| 5.0 / 8 reviews, none below five stars | Google profile |
| Drywall contractor | Google category |
| attention to detail ×2, quality of work ×2, great work ×2, efficiency ×2 | Google review topics |
| "looks like a brand new house" | JM VL's review |
| "makes sure you are happy with his work before he leaves" | Millie da Silva's review |
| Opens 8 AM Monday | Google profile |

Reviews are quoted verbatim, including Yasmin's leading row of star emoji and
the spacing in "at a great price !". Truncations are marked. None of the three
visible reviews carries an owner reply, so none is shown.

No star distribution is drawn: Google gives the average and the total only.

**The finish levels are presented as education, not as a claim.** The page says
"ask which level you are being quoted" rather than asserting that every job is
Level 5 — that would be a capability claim nothing in the listing supports.

**Hours are deliberately incomplete.** Google shows the Monday opening with the
rest behind "See more hours". Rather than invent a Tuesday-to-Sunday schedule,
`contact.html` prints Monday and says the rest is not published here. Get the
real table and fill it in.

## Before launch

- Complete the hours table.
- Confirm the service list — Google's category is authoritative for "drywall
  contractor", but the four service cards and the ceilings section describe the
  trade rather than a quoted scope.
- Photography is placeholder stock from Pexels in `assets/img/`. This trade
  photographs badly at the wrong moment and beautifully at the right one — real
  finished rooms shot in side light would be worth more here than on any other
  site in the set. Replace the files keeping the filenames.
- No licensing or insurance claims appear anywhere by design.
- Rating and review counts are current as of September 2026.
