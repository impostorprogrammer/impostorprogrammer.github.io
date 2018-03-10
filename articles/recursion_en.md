[//]: # ( spellcheck-language en )


[En Español](./recursion_es.html)
# Recursion
## To understand recursion, understand one bit of recursion then the rest of recursion.

In everyday live we are surrounded by recursion, there are recursive structures every where both man made and in nature, many repetitive tasks are recursive or can be viewed as recursive.


##  Traditional nested Matryoshka dolls are recursive in structure
<img src="./Nested_Matryoshka_Dolls.jpg" style="width:60%;min-width:500px;max-width:600px;" alt="Nested Recursive Matryoshka Dolls" title="Traditional Nested Matryoshka Dolls are recursive in structure" >




## Infinite recursion at play: A picture of a picture of a picture a picture...  
<img src="https://i.imgur.com/jMLR0.jpg" style="width:60%;min-width:500px;max-width:600px;" alt="Nested Recursive Picture in a Picture in a picture... courtesy of Imgur" title="Nested Recursive Picture in a Picture in a picture... courtesy of Imgur" >
<br/>Nested recursive picture of a picture of a picture... courtesy of Imgur


## Better our hands aren´t recursive...  
<img src="./RecursiveHand.jpg" style="width:60%;min-width:500px;max-width:600px;" alt="Recursive hand from the movie Dr. Strange" title="Recursive hand from the movie Dr. Strange" >
<br/>Recursive hand from the movie Dr. Strange




# Read a book with 100 pages using a recursive approach

1. **Problem:** Read a book with 100 pages 
<br/> **Solution:** If there are pages unread, read one page and then read a book with 99 pages.

2. **Problem:** Read a book with 99 pages 
<br/> **Solution:** If there are pages unread, read one page and then read a book with 98 pages.

3. **Problem:** Read a book with 98 pages 
<br/> **Solution:** If there are pages unread, read one page and then read a book with 97 pages.

3. **Problem:** Read a book with 97 pages 
<br/> **Solution:** If there are pages unread, read one page and then read a book with 96 pages.

### ........ steps excluded for brevity ..........

99. **Problem:** Read a book with 2 pages 
<br/> **Solution:** If there are pages unread, read one page and then read a book with 1 page.
 
100. **Problem:** Read a book with 1 pages 
<br/> **Solution:** If there are pages unread, read one page and then read a book with 0 pages.

101. **Problem:** Read a book with 0 pages 
<br/> **Solution:** If there are pages unread, no pages unread so you stop here!


# General solution: Read a book with **n** pages

1. **Problem:** Read a book with **n** pages 
<br/> **Solution:** If there are pages unread, read one page and then read a book with  **n-1** pages.

2. **Problem:** Read a book with **n-1** pages 
<br/> **Solution:** If there are pages unread, read one page and then read a book with **n-2** pages.

### ........ repeat until ..........

**n+1**. **Problem:** Read a book with **n-n** (0) pages 
<br/> **Solution:** There are no pages unread, so you stop here!


# Say out loud all the numbers from 1 to 5
1. **Problem:** Say out loud all the numbers from 1 to 5
<br/> **Solution:** Say out loud number 1, then say out loud the numbers from 2 to 5

2. **Problem:** Say out loud all the numbers from 2 to 5
<br/> **Solution:** Say out loud number 2, then say out loud the numbers from 3 to 5

3. **Problem:** Say out loud all the numbers from 3 to 5
<br/> **Solution:** Say out loud number 3, then say out loud the numbers from 4 to 5

4. **Problem:** Say out loud all the numbers from 4 to 5
<br/> **Solution:** Say out loud number 4, then say out loud the numbers from 5 to 5

5. **Problem:** Say out loud all the numbers from 5 to 5
<br/> **Solution:** Say out loud number 5, then there are no more numbers to say

# Generalized solution: Say out loud all the numbers from **n** to **m**
1. **Problem:** Say out loud all the numbers from **n** to **m**
<br/> **Solution:** Say out loud number **n**, then say out loud the numbers from **n+1** to **m**

2. **Problem:** Say out loud all the numbers from **n+1** to **m**
<br/> **Solution:** Say out loud number **n+1**, then say out loud the numbers from **(n+1)+1** to **m**

### ........ repeat ..........

**x+1**. **Problem:** Say out loud all the numbers from **n+x** to **m**, where **n+x == m**
<br/> **Solution:** Say out loud number **n+x**, when **n+x == m** there are no more numbers to say


# Now with programming....
Instead of saying out loud the numbers, let's print them in the console...
# Print all the numbers from 1 to 5 on the console

1. **Problem:** Print all the numbers from 1 to 5
<br/> **Solution:** Print the number 1, then print the numbers from 2 to 5

2. **Problem:** Print all the numbers from 2 to 5
<br/> **Solution:** Print the number 2, then print the numbers from 3 to 5

3. **Problem:** Print all the numbers from 3 to 5
<br/> **Solution:** Print the number 3, then print the numbers from 4 to 5

4. **Problem:** Print all the numbers from 4 to 5
<br/> **Solution:** Print the number 4, then print the numbers from 5 to 5

5. **Problem:** Print all the numbers from 5 to 5
<br/> **Solution:** Print the number 5, then there are no more numbers to print!


# Generalized solution: Print all the numbers from **n** to **m**
1. **Problem:** Print all the numbers from **n** to **m**
<br/> **Solution:** Print the number **n**, then print the numbers from **n+1** to **m**

2. **Problem:** Print all the numbers from **n+1** to **m**
<br/> **Solution:** Print the number **n+1**, then print the numbers from **(n+1)+1** to **m**

### ........ repeat ..........

**x+1**. **Problem:** Print all the numbers from **n+x** to **m**, where **n+x == m**
<br/> **Solution:** Print the number **n+x**, when **n+x == m** there are no more numbers print!

# With JavaScript code

<img src="./RecursivePrint.png" style="width:60%;min-width:500px;max-width:600px;" alt="JavaScript recursive print numbers" title="JavaScript recursive print numbers" >