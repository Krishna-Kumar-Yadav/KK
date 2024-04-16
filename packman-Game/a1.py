def listPrime(n):
    l = [i for i in range(2, n + 1)]
    j = 0
    while j < len(l):
        current_num = l[j]
        for num in l[j + 1:]:
            if num % current_num == 0:
                l.remove(num)
        j += 1
    print(l)

    string = ''
    for i in l:
        string += str(i)

    sum = 0
    for i in string:
        sum += int(i)

    print(sum)    



a = int(input("Enter number greater than 1 to generate a list of prime number :"))

listPrime(a)
