# How Mula works

Mula is a fictional currency based on the real value of money.

## The value of a Mula

The value of Mula shouldn't change over time. No matter what happens in the
economy or how many years pass, one Mula is always worth the same real value.

There's a few initial difficulties with this idea:

- There's more than one currency in the real world, and every currency can be
affected by economic forces differently (which is why exchange rates for
different currencies can vary over time).
- We usually compare the "real value" of money to actual money. For example,
we may talk about how much one million pounds from 1970 is now worth in 2020,
which compared 1970's pounds to 2020's pounds. You don't usually talk about
real value as a number on its own.

We can solve these problems in turn:

- Each currency has its own Mula which uses its own measure of real value,
usually an official index.
- An "origin date" is chosen for each Mula - the price of the index is taken on
that date, and that conversion ratio becomes the "exchange rate" between that
currency and its Mula.

Essentially, Mula uses the price index as the exchange rate. In this way, Mula
satisfies the properties we need from our fictional stable currency.

## How this repo works

### Enumerating currencies

In the `currencies/` folder of this repo, you'll find an `index.json` file which
contains associations between currency IDs and some information about them.
You'll also find a subfolder with a name matching the ID.

### Currency datasets

Each currency subfolder contains a `datasets/` folder, which contains various
scripts for fetching and parsing price index datasets.

Mula does not store or manage these datasets itself. Instead, they're fetched
from other open endpoints on the internet. For example, the `ons_cpi_mm23`
dataset fetches a Consumer Price Index time series from the UK Government's
Office of National Statistics website.

The job of each script is to fetch and parse this data so that it can be queried
via a standardised JavaScript interface. The script may also provide other
decorative information like display names and applicable license info.

In `currencies/index.json`, each currency declares which dataset should be used 
by default - this is typically an official dataset which tracks a price index 
across a wide range of consumer goods and services.

### The dataset interface

Each dataset script exports an async `get_dataset` function. When this
function is called, the dataset should be fetched from the source. Optionally,
pre-processing may be done by the script to convert the data into a more
query-friendly format.