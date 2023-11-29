+++
title = 'Analyzing long win streaks in online chess'
date = 2023-11-28
tags = []
images = ['/images/analyzing-long-win-streaks/cover.png']
math = true
+++

I've conducted a simple analysis using Elo win probability estimation and
Monte-Carlo simulation to estimate the likelihood of Hikaru Nakamura achieving
long win streaks, such as the one recently highlighted by Vladimir Kramnik. My
findings suggest these streaks are not statistical anomalies indicative of
cheating and are likely over an extended period (e.g., a year).  See
[Monte-Carlo simulation](#monte-carlo-simulations) tables and
[conclusion](#conclusion) below.

This post doesn't aim to determine whether Hikaru Nakamura or other players have
engaged in cheating. Instead, my goal is to critically examine historical data
from Chess.com games, focusing on the probability of long win streaks and
exceptional performances. It's important to note that this analysis primarily
involves significant outliers, both regarding the players and their
performances, which makes general-case judgments challenging.

Should you find any errors or inconsistencies, please feel free to contact me at
<kbobyrev.opensource@gmail.com>. For those interested in the technical aspects,
the scripts I used for this analysis are available
[here](https://gist.github.com/kirillbobyrev/c16ef00e01370e9789d1d6b91fe63442).

![Cover](/images/analyzing-long-win-streaks/cover.png)

## Prelude

Vladimir Kramnik, a renowned name in the chess world, has recently sparked a
significant conversation about cheating in both online and offline chess. This
topic has been a hot subject on chess news platforms and online forums. If
you're curious, check out Kramnik's videos on the [Levitov
Chess](https://www.youtube.com/@LevitovChess)YouTube channel where he shares his
insights and some intriguing findings.

The advent of powerful chess engines like Stockfish, AlphaGo, and Leela Chess
Zero, which can outperform humans, has brought the issue of cheating in chess
into the spotlight. These tools are easily accessible, amplifying concerns in
the chess community. High-profile incidents such as the Carlsen-Niemann saga and
Kramnik’s own allegations highlight the severity of the situation. The ease with
which players can cheat online is a significant challenge, and many top players
view it as a threat to the integrity of the game.

Opinions vary on how widespread cheating really is. For example, Fabiano Caruana
mentioned on the [C-Squared](https://www.youtube.com/@csqpod) that he believes a
significant portion (~50%) of titled players may have cheated online at some
point. It’s a consensus in the chess community that cheating is a prevalent
issue and a barrier to ensuring fair play.

From my own experience as a chess player around the 2000 Elo blitz level on
platforms like Lichess and Chess.com, I've encountered opponents who likely play
better than they should. And at the top level, where there's more at stake, the
issue of cheating becomes even more critical.

As someone with a background in software engineering, data science, and
mathematics, and a passion for chess, I'm interested in exploring Vladimir
Kramnik's recent statements. My aim is to sift through the data and see if
there's substance to these claims. Let's dive into the analysis and see what we
find.

## Kramnik vs Hikaru

The latest arc of the cheating drama is featuring Vladimir Kramnik posting an
entry in his Chess.com blog that later got reposted by 2-time World Chess
Championship challenger Ian Nepomniachtchi:

{{< tweet user="lachesisq" id="1726710420415889762" >}}

The focus of these allegations is Hikaru Nakamura, a renowned chess player known
for his exceptional skills in blitz chess and his popular online presence. The
claim is that Nakamura might have used unfair means to win games on Chess.com,
an assertion that has raised eyebrows due to the statistical improbability of
his success against skilled opponents.

Vladimir Kramnik, [discussing these findings](https://youtu.be/2u-DKBSzJ1s) on
the Levitov Chess channel, made it clear that he isn't directly accusing
Nakamura of cheating. However, he expressed his belief that Nakamura's recent
game results are unusual and warrant further investigation by Chess.com.
Kramnik's call for an investigation and his stance have sparked significant
discussions, especially on online forums like r/chess, highlighting the
community's deep interest and concern over this issue.

### Claim

Let's look at the data that Kramnik has presented in detail. At
[22:09](https://youtu.be/2u-DKBSzJ1s?si=IhLJu9kqChzYtHhk&t=1328) there is a
table with few game sequences that Vladimir finds suspicious:

| Avg opponent rating |  Results  | Performance rating |
| :-----------------: | :-------: | :----------------: |
|        2950         | 45.5 / 46 |        3627        |
|        2912         | 34.5 / 35 |        3589        |
|        2737         |  55 / 55  |         ∞          |
|        2949         |  46 / 48  |        3450        |
|        2792         | 47.5 / 48 |        3469        |

Vladimir has mentioned many times that he is working with a group of
(enthusiast) mathematicians who are looking at the data critically and are
calculating probabilities of the abnormal events that Kramnik finds. It sounds
like Kramnik is mostly examining the games and data manually, although I am not
sure about it.

### Motivation

I thought that these findings are interesting and decided to take a closer look.
I think it's important to divide the discussion that I have summarized above and
choose specific parts where I can use my skills. I would like to have an
unbiased critical look at the data and get some conclusions of whether the
presented data is really a statistical anomaly.

First, I believe the claim that cheating is a huge problem and that the chess
world should fight against fair play violations is absolutely valid. I think
that it is important to separate this particular issue from the rest of what
Vladimir is claiming in his videos.

Second, I think that while Hikaru Nakamura is unlikely to cheat, these game
series seem to be very low-probability and the fact that there are 5 of them
over the short span of 60 days is probably worth looking into. I don't have
biases for or against either Hikaru Nakamura or Vladimir Kramnik, and I'm
willing to study the data and avoid cherry-picking it to fit my beliefs.

## Looking into data

I have decided to use few different techniques and tools to study the data and
investigate Kramnik's claims. I will mostly focus on a relatively simple
question: how probable is it for Hikaru Nakamura to have the performances like
the ones in the table that Kramnik has presented?

Luckily, Chess.com provides [Published-Data
API](https://www.chess.com/news/view/published-data-api) that I can use to
gather more data and look at more aggregated statistics. I want to understand
how many games he has played in general and whether there could be more
statistical anomalies among these games. I will use [monthly
archives](https://www.chess.com/news/view/published-data-api#pubapi-endpoint-games-archive)
endpoint to the games.

The dataset I have collected has the following properties:

- Games are rated
- Games are played in 3+0 blitz time control: Hikaru goes into detail on why
  blitz with and without increment are very different in a [recent
  video](https://youtu.be/sr6gBCG_hb4?t=731) and shouldn't be compared directly
- Games are played between `2023-09-26` and `2023-11-26` (60 days period that is
  consistent with Kramnik's analysis)
- Played in the standard chess format (as opposed to Fischer Random Chess)

Here are my findings:

- Hikaru has played a total of 600 games in the last couple of months
- Hikaru won 518 of these games
- Hikaru drew 26 of these games
- Hikaru scored 531 out 600 points in total or 88.5% of total points
- Hikaru's average rating was 3248.42
- The average opponent rating is 2873.43, median opponent rating is 2919.5

That is quite astonishing and I did not expect Hikaru to win that much against
skilled opposition. Losing only 69 points out of 600 is indeed very impressive.

Let's look at Hikaru's opponents rating distribution:

![Hikaru's opponents rating distribution](/images/analyzing-long-win-streaks/hikaru_opponent_ratings.png)

Here are top 5 win streaks:

| Length | Avg opponent rating | Starting rating |                  First game                   |
| :----: | :-----------------: | :-------------: | :-------------------------------------------: |
|   55   |       2736.64       |      3176       | <https://www.chess.com/game/live/89602740099> |
|   45   |       2772.89       |      3231       | <https://www.chess.com/game/live/94493554773> |
|   35   |       2864.83       |      3226       | <https://www.chess.com/game/live/89994571321> |
|   34   |       2744.71       |      3222       | <https://www.chess.com/game/live/90353334085> |
|   28   |       2930.96       |      3287       | <https://www.chess.com/game/live/93637696397> |
|   26   |       2958.46       |      3256       | <https://www.chess.com/game/live/93912033813> |

These streaks are quite impressive, and I think I have found the streak that
Vladimir Kramnik has mentioned in his video! The longest win streak does feature
2736.64 average opponent rating, which is exactly 2737 after rounding up. It
looks like I'm using a similar methodology so far.

Another thing I wanted to consider is Hikaru's starting rating. The ratings
often vary for players and can go up and down by 200-300 points depending on
mood, fatigue, tilt and other factors. I decided to point out Hikaru's rating at
the start of the streak as a simple snapshot of his shape in that particular
time frame.

## Looking at other players

Hikaru mentioned the concept of "farming" in [his recent
video](https://youtu.be/sr6gBCG_hb4?t=900) in response to the winning
streak data found by Kramnik. "Farming" is beating the opponent consistently to
"create content" and gain rating. Hikaru claims that he and Daniel Narodisky are
particularly strong in winning against lower-ranked opponents many times in a
row and that statistics would be different for Magnus Carlsen or Fabiano
Caruana.

I think Hikaru and Daniel certainly have an aura of being incredible blitz
players that are incredibly hard to win against online. This certainly creates
more opportunities for them and puts psychological pressure on their opponents.
I'm curious to see how much this affects the winning streaks and other
dimensions we have explored so far. I'll take games over the whole 2023 so far
(up until 2023-11-28) and few players. Let's take top 5 players from Chess.com
blitz [leaderboard](https://www.chess.com/leaderboard/live) from today:

![Top 5 blitz players on Chess.com](/images/analyzing-long-win-streaks/top_5_blitz.jpeg)

Hikaru Nakamura and Daniel Narodistky have by far most games, which is expected
since both of them are streaming a lot and play online almost exclusively (with
the exception of Hikaru recently having awesome live classical performances).

MVL only played 94 games in 3+0 format this year, so I won't calculate data for
him.

Let's look at some statistics for all these players for 2023:

|   Statistics    | Carlsen | Nakamura |  Sarin  | Naroditsky |
| :-------------: | :-----: | :------: | :-----: | :--------: |
|      Games      |   908   |   3032   |  2767   |    5123    |
|     Points      |  716.5  |  2558.5  | 1970.5  |   3964.0   |
| Scored of total |  78.9%  |  84.38%  |  71.9%  |   77.3%    |
|   Avg rating    | 3227.60 | 3216.22  | 3142.38 |  3130.88   |
|  Avg opponent   | 2984.50 | 2897.95  | 2976.46 |  2901.46   |
|   10+ streaks   |   15    |    79    |   23    |     62     |
|   15+ streaks   |    3    |    35    |    3    |     21     |
|   20+ streaks   |    1    |    17    |    1    |     6      |
| Longest streak  |   32    |    55    |   22    |     33     |

These statistics indeed look very surprising. As Hikaru mentioned, I think it's
a fair assumption that Narodistky is probable a better comparison than Carlsen,
Sarin or other players, because Daniel is an incredibly strong player himself
and has similar goals to create content through streams and videos. Daniel
Naroditsky also has amazing blitz skills, especially when it comes to time
controls without increment. I believe, this heavily influences the outcomes.

Carlsen and Sarin are nowhere close to both Nakamura and Naroditsky in terms of
win streaks count. Carlsen has played much less, but Sarin played almost as much
as Nakamura. However, it's worth noting that an average opponent of Sarin is
almost 100 rating points higher than for Nakamura. That, coupled with the fact
that Sarin's average rating is 70 points lower than Nakamura's probably explains
a lot. In that regard, Naroditsky is again very close to Hikaru in terms of
average opponent, even though his average rating is also 86 points lower than
Nakamura's. Let's take a look at the average rating gap between each player and
their opponent:

|   Player   | Average rating gap |
| :--------: | :----------------: |
|  Carlsen   |        243         |
|  Nakamura  |       318.3        |
|   Sarin    |        166         |
| Naroditsky |       229.4        |

Here, it is clear that Nakamura plays a lot against much lower-rated opponents.
That is likely due to the fact that he plays a lot and is very high-rated
himself. If Naroditsky's average rating was much higher, then the gap would be
very similar, so again it makes much sense to compare Nakamura and Naroditsky
here. Sarin also plays a lot, but it looks like he mostly plays against very
high-rated opponents and is likely mostly interested in training rather than
gaining rating points and creating content.

I think it's important to note that Nakamura and Naroditsky likely have very
high motivation to play for the sake of gaining rating points and having long
winning streaks. Nakamura is arguable "the face of Chess.com" and a large
streamer, so being ranked number 1 means a lot to him.

Now, let's get to figuring out how probable it is to get these streaks.

## Analysis

My main question is: what would be a probability of Hikaru having these very
long winning streaks against opponents of the rating groups that I found?

Let's discuss some limitations: we will consider win probability in each game to
independent of adjacent games. This is not strictly true in real life: factors
such as fatigue, tilt, time of day and many others certainly have some impact on
player's ability to win.

I will also consider that Hikaru's rating (and his opponents' ratings) is
"true", i.e. he has not cheated while achieving it. He is a top-2 ranked blitz
player in the world and top-3 classical (according to today's
[2700chess](https://2700chess.com/) leaderboard).

It's not trivial to calculate the probabilities directly. I will use Monte-Carlo
simulation to simulate a large number of games being played between each player
and his opponents and check how often we find similar win streak patterns. The
key here is knowing an approximate probability of each game outcome. We can use
win probability formula based on players Elo rating or a Machine Learning model.
This approach is similar to one used on
[Pawnalyze](https://pawnalyze.com/tournament/2022/02/27/Elo-Rating-Accuracy-Is-Machine-Learning-Better.html).

I will try to use a very simple model (Elo) and a more complicated Machine
Learning model that will require gathering dataset for the model training.

### Using Elo to estimate the outcome probabilities

Elo is a good model, because it's simple, is studied well and has been long
applied to chess. It's a great starting point. It has, however, a number of
problems.

A common issue with Elo system is that it doesn't take into account White's
first move advantage and it also doesn't work very well with large Elo
differences.  Also, constants used here are some widely used ones and they are
best suited for FIDE classical ratings, which have a slightly different range
(with the top players never getting above 2900 whereas on Chess.com Hikaru and
Magnus Carlsen have achieved a rating over 3300). Blitz and classical are quite
different, too.

In addition, Chess.com appears to be using Glicko rating system which would have
different formulas for win probabilities but for the sake of simplicity we'll
still use Elo which should be close enough anyway.

Nonetheless, it will be used as a crude approximation for the first attempt to
calculate probabilities.

For Elo, we can use the same formulas from [Wismuth Elo
calculator](https://wismuth.com/elo/calculator.html) that is mentioned by
Pawnalyze article:

```python
def expected_score(elo_difference):
  return scipy.special.erfc(-elo_difference / ((2000.0 / 7) * np.sqrt(2))) / 2
```

There "full" formula that takes into account draws in chess (Note 7 on Wismuth)
does not give good results for our rating ranges and is not reliable. Also,
draws are *very* common in high-level classical chess. In fact, draws are often
the default result of these games. In online blitz without an increment that is
not the case, because of flagging. The difference in "expected score" and
adjusted probabilities is quite large. For example, in case of Hikaru's 55-win
streak he started with a rating of 3176 against average opponents having 2736.
The expected score (or "simple win probability") is 93.7% while the adjusted
probability is 70% with the draw probability of... 47%! That doesn't add up
because of FIDE constants and different rating ranges.

I think this is a critical observation, because it heavily influences the
resulting probability. We will consider the expected score to be an overly
optimistic win probability for the sake of simplicity.

And here we can also see that draws are much less likely in faster time
controls:

| Time control | Carlsen | Nakamura | Sarin | Naroditsky |
| :----------: | :-----: | :------: | :---: | :--------: |
|     1+0      |  11.2%  |   6.9%   | 7.6%  |    8.3%    |
|     3+0      |  11.5%  |   7.8%   | 11.4% |   13.5%    |
|     3+1      |  14.9%  |  13.8%   | 12.3% |   23.1%    |

Even when the difference is just a second of increment, for professional chess
players that is enough to make a huge difference.

Let's take a look at the projected *average* win probabilities of each player
throughout the year.

|   Statistics    | Carlsen | Nakamura |  Sarin  | Naroditsky |
| :-------------: | :-----: | :------: | :-----: | :--------: |
|   Avg rating    | 3227.60 | 3216.22  | 3142.38 |  3130.88   |
|  Avg opponent   | 2984.50 | 2897.95  | 2976.46 |  2901.46   |
| Win probability |  80.2%  |  86.7%   |  71.9%  |   78.9%    |

Now let's turn to each player's longest winning streak:

|   Statistics    | Carlsen | Nakamura | Sarin | Naroditsky |
| :-------------: | :-----: | :------: | :---: | :--------: |
|  Streak length  |   33    |    55    |  22   |     33     |
|  Start rating   |  3162   |   3176   | 3148  |    3075    |
|  Avg opponent   |  2884   |   2736   | 2906  |    2819    |
| Win probability |   83%   |   93%    |  80%  |   81.4%    |

There's a clear pattern here: the opposition is way weaker than the average
opposition of each player. As a result, win probability is significantly higher.

### Monte-Carlo simulations

Let's spin up Monte-Carlo simulations and finally see if the win streaks we
found make sense!

The simulation I use is very crude, because it basically assumes:

- Each game is independent (which is certainly not true: I would imagine an
  opponent who lost a number of games to be demoralized)
- Each player maintaining the same rating throughout all games (average player
  rating)
- All opponents having the same rating (average opponent rating): that is also
  certainly not true. For example, while Hikaru Nakamura's average opponent
  rating throughout the year is 2897.95, the historic 55-game win streak was
  scored against opponents of 2736 average rating. That is over 150 points
  difference!

#### Probability of scoring multiple short and long win streaks

To understand what parameters to use for each simulation, let's take a look at
[previous section](#looking-at-other-players)'s table again.

|     Statistics      | Carlsen | Nakamura | Sarin | Naroditsky |
| :-----------------: | :-----: | :------: | :---: | :--------: |
|        Games        |   908   |   3032   | 2767  |    5123    |
|     10+ streaks     |   15    |    79    |  23   |     62     |
|     15+ streaks     |    3    |    35    |   3   |     21     |
|     20+ streaks     |    1    |    17    |   1   |     6      |
| Avg win probability |  80.2%  |  86.7%   | 71.9% |   78.9%    |

In the table above, the average win probability is the one for the entire year.

I will run simulations and estimate probability of each player having at least
as many streaks of given length as they have scored in real life over the past
year.

So, for each simulation the parameters are:

- Number of games: played throughout the year
- Streak cutoff: 10, 15 or 20
- Minimum number of streaks: streaks that the player has scored throughout the
  year (table above)
- Win probability: average win probability (table above)

| Probability of | Carlsen | Nakamura | Sarin | Naroditsky |
| :------------: | :-----: | :------: | :---: | :--------: |
|  10+ streaks   |  94.6%  |  99.9%   | 90.6% |    100%    |
|  15+ streaks   |   97%   |  99.5%   | 91.8% |   98.3%    |
|  20+ streaks   |   89%   |  95.5%   | 65.3% |   91.5%    |

Because streaks of 20+ wins are such an outlier and were scored against weaker
field, not the average field of opponents each player has faced, the probability
drops noticeably. That is expected.

Other than that, it looks like the win streaks we have observed are completely
normal and very likely. Also, Nakamura's "fighting" style certainly yields great
results.

#### Probability of scoring the single longest win streak

Now, let's turn back to the question of whether the longest win streak is
probable or not for each player.

|   Statistics    | Carlsen | Nakamura | Sarin | Naroditsky |
| :-------------: | :-----: | :------: | :---: | :--------: |
|      Games      |   908   |   3032   | 2767  |    5123    |
| Win probability |   83%   |   93%    |  80%  |   81.4%    |
| Longest streak  |   32    |    55    |  22   |     33     |

In this table, the win probability is the one calculated against a weaker field
of players who have been defeated in the longest win streak of each player. We
will "assume" that each player has been playing against this weaker field the
whole year for simplicity.

Let's calculate probability of scoring the longest winning streak for each
player:

| Probability of | Carlsen | Nakamura | Sarin | Naroditsky |
| :------------: | :-----: | :------: | :---: | :--------: |
| Longest streak |  32.3%  |  98.4%   | 98.5% |   65.6%    |

These results are more interesting. I certainly did not expect Carlsen's
probability of getting a win streak of 32+ games to be this low given relatively
high win probability that he has, but also Carlsen is the one who played a least
number of games this year on Chess.com. I'm pretty sure he plays a lot on
Lichess and he is still the best player in the world, so I think the "Magnus
factor" (among many others) has a huge influence.

## Conclusion

My analysis, while basic and approximate, suggests that the winning streaks
found in top players' online blitz games on Chess.com are not statistically
improbable. Despite the rudimentary nature of my methods, the key takeaway is
that the occurrences highlighted by Vladimir Kramnik do not seem to be
extraordinarily rare, even with this possibly optimistic approach.

While I respect Kramnik's efforts to shed light on the prevalence of online
cheating, the specific insinuation regarding Hikaru Nakamura's alleged cheating
seems quite unlikely. Considering his consistent performance both in
over-the-board and online chess, Nakamura's results appear to be within the
realm of possibility.

There's room for improvement in my analysis. Primarily, I plan to move from a
basic Elo-based estimation to a more refined machine learning model trained on
Chess.com's historical data. This isn't just about verifying the probability of
long win streaks but also about understanding how different the outcomes are
from the simple Elo model used in this study. If time permits, I'll share these
enhanced findings in a future post.

Additionally, having access to Chess.com's historical data allows me to simulate
the actual game sequences players have experienced this year. Instead of relying
on win probabilities against an 'average opponent,' using individual game data
and opponent ratings should yield more precise results. I look forward to
refining my analysis and welcome any thoughts or suggestions from the community.
