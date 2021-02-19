# Bonsai React Interview Test - Thomas Baxter - Submissions - Full Stack Dev (02/19/2021)

## Intent
My goal was to show how I would think about problems and provide rationale for why I chose to take the actions I did. In general I found the way that
this test code was provided to lack alot of basic requirements for good dev practices so I wanted to highlight my approach to how to incrementally
improve that.

That does leave the diffs in this PR to be rather heavy and hard to review. In real world practice this would have been submitted piecemeal - i.e
submit the refactor for review, then submit functional changes for review - which would have lessened the overhead of reviewing such changes. 

I do recognize that the sub-standard code quality of the base test code, might be a test in an off itself (i.e. working within an existing code base),
but the under the hood refactors I consider basic "table stakes" for empowering devs to create optimal code.

I concentrated on user-facing features rather than adding in the ability to unit test within this stack, as that seemed somewhat discouraged by the
guidelines provided (which in an of themselves I did find slightly contradictory). If the ability to write tests was provided extant with the stack
provided, I would be submitting tests along with this (TL;DR: I feel bad about the lack of tests).

## User Facing Features Added
- loading screen
- Adding "Favourite" functionality
- Adding "Notify Me" functionality for out of stock items
- Making "Buy Now" functional

## Mongo DB
See note on `Database` support below


## Dev Facing Changes and rationale
- Abstracted hardcoded asset URLs to .env
 - not everyone develops on `localhost`
- Added Database support
 - This is disabled by default as I have no control over where this would be run (providing a docker container seemed out of scope)
 - To enable this update `MONGO_ENABLED` in `.env` along with the connection credentials
- Refactored the existing code for composability
 - The intent here is that while, yes, I could have added the features in situ without the change this would pose a long term maintenance problem
- Added linting 
 - Table stakes stuff, I like me my linting rules. You may not agree with all of the ones I have enabled currently, but the intent to include them is
   to indicate what I hold myself to when coding
- Updated webpack to support proper class-based React component syntax
- added a notion of filtering/sorting
 - Just breadboarded the functionality, it does not implement filtering yet
- User Favourites are not persisted immediately to the database
 - "Favourites" are largely ephemeral and do not require immediately being saved to the database.
 - waiting until the user has expressed a desire to take a valuable action - ie. purchase something - 
 allows us to do some initial segmentation of this data so we avoid overloading the database with low-value calls
 - This is why Favourites are only saved once we capture an email address from the user
- The flow to create an order is utterly contrived
 - i.e there is not payment data captured; no shipping data captured
 - this was excluded as this would likely be deferred to a PCI holder




