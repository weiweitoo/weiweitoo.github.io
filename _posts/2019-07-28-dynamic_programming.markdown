# Prior-knowlegde - Recursion

![Visualization of Recursion][recursion_image]
*Image Source: GeeksforGeeks*

I bet everyone who reading this are definitely know about recursion. So will just simply go through it as a revision.

Recursion is something that many computer science majors consider elegant.  A recursion function is a function where a function is calling the function itself, until a "basic condition" is true, and execution stops. While false, we will keep placing execution contexts on top of the stack.

Here is an example about how to find [fibonacci](https://en.wikipedia.org/wiki/Fibonacci_number) using recursion in python
```python
def recur_fibo(n):
   """Recursive function to print Fibonacci sequence"""
   if n <= 1:
       return n
   else:
       return(recur_fibo(n-1) + recur_fibo(n-2))

print(recur_fino(6)) # answer is 8
```

In real world, some problem can only be solved by using recursion. That means, recursion is a must in some situation, or maybe just more natural to do it with recursion. Just like Fibinocci! From another point of view, recursive is just make your code more readable and pretty. 

## Is there a risk for recursion?
Yes. Definitely.

> "Great power come with great responsibility" - Uncle Ben.

Recursive is just keep placing execution contexts on the top of the stack. It is a accumulated process. Once it reach a limit, "StackOverflow" will happend. Stack overflow is when we run out of memory to hold items in the stack. 

*python have a default recursive limit - 1000, but you can change it by calling sys.setrecursionlimit(num_of_limit)*

Other than that, recursive is just much more slower and slower. So if you are a game programmer, don't ever use recursion :P.


*Additional Knowledge*
```
The reason that why recursive slow
// TODO
```

# Dynamic Programming
Dynamic Programming (from now on abbreviated as DP) is an optimization method for recursion. Apparantly, there are 2 way of doing DP. Top-Down DP and Bottom-Up DP.

Example 1: Wedding Shopping

**Problem statement:**
Given different models for each garment (e.g. 3 shirts, 2 belts, 4 shoes, ...), buy one model of each garment. As the budget is limited, we cannot spend more money than the budget, but we want to spend the maximum possible. But it is also possible that we cannot buy one model of each garment due to that small amount of budget. 

The input consist of two integers 1 ≤ M ≤ 200 and 1 ≤ C ≤ 20, where M is the budget and C is the number of garments that you have to buy. For a garment id ∈ [0 . . .C-1], we know an integer 1 ≤ K ≤ 20 which indicates the number of different models for that garment id, followed by K integers indicating the price of each model ∈ [1 . . .K] of that garment id. 

The output should consist of one integer that indicates the maximum amount of money necessary to buy one element of each garment. If there is no solution, print "No solution"

**Example input 01**
M = 20, C = 3
3 models of garment id 0 → 6 4 8
2 models of garment id 1 → 5 10
4 models of garment id 2 → 1 5 3 5

**Example output 01**
19

**Exaplanation**
(8 + 10 + 1)
8 from garment id 0
10 from garment id 2
1 from garment id 2

## To do it in DP
**Notation**
*shop(money_left, garment_id)* is a notation of buying *garment_id* with *money_left* that you have

**Method 1: Bruce Force**
Do a complete search. You may do it in this way
1. if money_left < 0, 
   shop(money_left, garment_id) = INVALID
2. if a model from the last garment_id has been bought, 
   shop(money_left, garment_id) = M - money_left (this is the actual money spent)
3. in general case, for all model in [1 . . .K] of current garment_id 
   shop(money_left, garment_id) = max(shop(money_left - price[garment_id][model], garment_id + 1))

This solution is just works! But it is very slow! 
Let's take a look at a bigger range of input.
Assume garment_id 0, 1, ... 20. All of them have 20 choice. 
The time complexity will be 20 x 20 x ... x 20 of total 20 times in worst case. In the end it will ended up with O(20^20)

This is where we come to method 2, doing it in recursive way with some optimization.

**Method 2: Top-Down DP(Memorization)**
Memorization is one of the optimization technique for recursion. First, when we doing recursive or DP. We have to analyze the question and come out a subproblem, where usually they have. 

1. This problem has optimal sub-structures (Criteria of using recursive)
This is shown in Complete Search recurrence 3 above: solution for the sub-problem is part of the solution of the original problem.

2. This problem has overlapping sub-problems(Criteria of using Top-Down DP)
The search space is actually not as big as 20^20 analyzed in Complete Search discussion above as many sub-problems are actually overlapping. For instance, we are actually repetatively compute some of the same subproblem. 

Once the 2 criteria is satisfied. We can do it in Top-Down DP!

Suppose that there are 2 models in certain garment_id with the same price p. Then, Complete Search will move to the same sub-problem shop(money_left - p, garment_id + 1) after picking either model! Similarly, this situation still happen again if some combination of money_left and chosen model’s price causes money_left1 - p1
= money_left2 - p2. Then, the same sub-problem will be computed more than once! Inefficient!

But how many actually sub-problems is there for us to compute in order to get the answer? Assume, we have 201 money(0 - 200, inclusive), 20 possible garment_id(0 - 19, inclusive). Then in order to solve this problem, we only need to compute for 201 x 20 = 4020 sub-problems. Easy? Yes.

How to do it?
1. Initialize a DP 'memo' table with size of distinct sub-problems

2. At the start of recursive function, simply check if this current state has been computed before.
(a) If yes, return the value from the DP memo table, O(1).
(b) If not, compute and then store the computed value in the memo table, for future usage

If it has M states, then it requires at least O(M) memory space. If filling a 'memo' table requires O(k) steps, then the overall time complexity is O(kM). In the example above has M = 201 × 20 = 4020 and k = 20 (as we have to iterate through at most 20 models for each garment_id). Thus the time complexity is 4020×20 = 80400.

**Method 3: Bottom-Up**
I would say this method is one of the amazing power of DP. Step of doing this can be summarized as 
1. Identify the Complete Search recurrence as with top-down DP above
2. Initialize some parts of the DP table with known initial values
3. Determine how to fill the rest of the DP table based on the Complete Search recurrence, usually involving one or more nested loops to do so

First, we have a boolean matrix can_reach[money_left][garment_id] of size 201 × 20, initialize it with False. And only the cells reachable by buying and of the models will be set as True. For example, '20-6=14', '20-4=16', '20-8=12', that means only money with 14, 16, 12 are reachable in this case, so it will set as true. Also, can_reach[a + price of any model of previous garment_id][b - 1] only will be set as true. By doing this, only those cell that are 'reachable' in this problem will computed. And in the end, the answer can be found in the last column. Find the cell in that column nearest to index 0 that is set to be true.

This means that we can somehow reach this state (money_left = 1) by buying combination of various garment models. The final answer is actually M - money_left, or in this case, 20-1 = 19. The answer is "no solution" if there is no cell in the last column that is set to be true.


![Visualization of Reachable Table][example_1_table]


Example 2: Uber Interview Question - Maximum Sum of Non-adjacent Elements

**Problem Statement:**
Given an array of integers, find the subset of non-adjacent elements with the maximum sum. Calculate the sum of that subset.

**Example input 01**
3 7 4 6 5

**Example output 01**
13

The possible subset are [3 4 5],[3 4],[3 6], [3 5], [7 6], [7 5], [4 5]. Where sum of [7 6] is 13.

There are multiple way of doing it
- Burce Force(Recursive)
- Top-Down DP
- Bottom-Up DP

**Method 1: Bruce Force**
The brute-force approach will be to generate all subsets of elements of the array and for each subset where the elements are non-adjacent, then check the sum and print the maximum of all the sums. The time-complexity of this approach is O(2^n). Which is pretty slow.

**Method 2: Top-Down DP**


[recursion_image]: http://www.hitoo.co/assets/images/post/example_1_table.png "Visualizing Recursion"
[example_1_table]: http://www.hitoo.co/assets/images/post/Recursive-Functions-in-c.png "Visualization of Reachable Table"