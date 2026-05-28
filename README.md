# NBA GOAT Score Lab

An interactive static website for exploring NBA all-time rankings with a weighted GOAT score model.

## Features

- Top 100 leaderboard by default
- Custom leaderboard sizes up to top 450
- Searchable player profiles
- Unknown-player estimator using real stat inputs
- Peak-era filter from the 1950s through the 2020s
- Category breakdowns for longevity, peak, playoffs, versatility, gravity, two-way impact, and accolades
- Animated court-inspired visuals and responsive layout

## Formula

```text
GOAT_SCORE =
  0.22 * LONgevity +
  0.20 * PEAK +
  0.16 * PLAYOFFS +
  0.14 * VERSATILITY +
  0.10 * GRAVITY +
  0.10 * TWO_WAY_IMPACT +
  0.08 * ACCOLADES
```

Each category is scored on a 0-10 scale.

## Run Locally

This is a plain HTML/CSS/JavaScript site. No install step is required.

```bash
python3 -m http.server 5173
```

Then open:

```text
http://127.0.0.1:5173/
```

## Files

- `index.html` - page structure
- `styles.css` - layout, visuals, responsive design
- `app.js` - player data, formula, ranking logic, filters, and estimator

## Notes

The provided top 100 player category values are treated as the primary scoring dataset. Players outside that provided list are rescaled after the top 100 so their scores match their current placement instead of jumping above the provided board.
