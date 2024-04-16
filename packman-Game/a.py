def listPrime(n):
  l = [i for i in range(2,n+1)]
  B = []
  a = 1

  for i in l:
    for j in range(a,len(l)):
      if i == 0 or l[j] == 0:
        continue
      elif l[j] % i == 0 :
        l[j] = 0
        
    a += 1
  

  for i in l:
    if i != 0:
      B.append(i)
  
  print(B)        
        


listPrime(50)