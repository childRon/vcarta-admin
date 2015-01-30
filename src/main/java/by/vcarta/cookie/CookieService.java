package by.vcarta.cookie;
import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.util.Dictionary;
import java.util.Hashtable;


/**
 * This class manages all operations for working with cookies.
 */
public class CookieService {

	private int mMaxSize;
	private int mCookieLiveTime;
	private String mCookiePath;
	private String mCookieDomain;
	private Hashtable mIncomingCookieParameters;
	private boolean mCookieParametersParsed;

	private String mObsoleteCookieDomain;
	private boolean mClearCookiesWithObsoleteDomain;



	/**
	 * Adds the pCookieValue parameter into the cookies.
	 *
	 * @param pCookieName the cookie name
	 * @param pCookieValue the cookie value
	 * @param pResponse the response
	 */
	public void addCookie(final String pCookieName, final String pCookieValue, final HttpServletResponse pResponse) {
		addCookie(pCookieName, pCookieValue, pResponse, getCookieLiveTime());
	}

	/**
	 * Adds the pCookieValue parameter with unlimited live time into the cookies.
	 *
	 * @param pCookieName the cookie name
	 * @param pCookieValue the cookie value
	 * @param pResponse the response
	 */
	public void addTimelessCookie(final String pCookieName, final String pCookieValue, final HttpServletResponse pResponse) {
		addCookie(pCookieName, pCookieValue, pResponse, Integer.MAX_VALUE);
	}

	/**
	 * Adds the pCookieValue parameter into the cookies with fixed cookie live time.
	 *
	 * @param pCookieName the cookie name
	 * @param pCookieValue the cookie value
	 * @param pResponse the response
	 * @param pCookieLiveTime the cookie live time
	 */
	public void addCookie(final String pCookieName, final String pCookieValue, final HttpServletResponse pResponse, final int pCookieLiveTime) {
		pResponse.addCookie(createCookie(pCookieName, pCookieValue, pCookieLiveTime));
		if (isClearCookiesWithObsoleteDomain()) {
			deleteObsoleteCookie(pResponse, pCookieName);
		}
	}

	/**
	 * Creates a cookie object used the specified parameters.
	 *
	 * @param pCookieName the cookie name
	 * @param pCookieValue the cookie value
	 * @param pCookieLiveTime the cookie live time
	 * @return the created cookie
	 */
	protected Cookie createCookie(final String pCookieName, final String pCookieValue, int pCookieLiveTime) {
		Cookie cookie = new Cookie(pCookieName, pCookieValue);
		cookie.setMaxAge(pCookieLiveTime);
		cookie.setVersion(0);
		cookie.setSecure(false);
		cookie.setPath(getCookiePath());
		if (getCookieDomain() != null) {
			cookie.setDomain(getCookieDomain());
		}
		return cookie;
	}

	/**
	 * Returns the value of the cookie with pCookieName name.
	 *
	 * @param pCookieName the cookie name
	 * @param pRequest the request
	 * @return the value of the cookie with pCookieName name.
	 */
	public String getValueFromCookies(final String pCookieName, final HttpServletRequest pRequest) {
		parseCookieParameters(pRequest);
		return fetchParameter(this.mIncomingCookieParameters, pCookieName);
	}

	synchronized void parseCookieParameters(final HttpServletRequest pRequest)
	{
		if (!this.mCookieParametersParsed) {

				this.mIncomingCookieParameters = new Hashtable();
				this.mCookieParametersParsed = true;
				Cookie[] cookies = pRequest.getCookies();
				if (cookies != null) {
					for (int i = 0; i < cookies.length; i++) {
						String key = cookies[i].getName();

						String[] vals = (String[])this.mIncomingCookieParameters.get(key);
						if (vals != null) {
							String[] tmp = new String[vals.length + 1];
							System.arraycopy(vals, 0, tmp, 0, vals.length);
							vals = tmp;
							vals[(vals.length - 1)] = cookies[i].getValue();
							this.mIncomingCookieParameters.put(key, vals);
						}
						else {
							vals = new String[1];
							vals[0] = cookies[i].getValue();
							this.mIncomingCookieParameters.put(key, vals);
						}
					}
				}

		}
	}

	String fetchParameter(Dictionary pParameters, String pKey)
	{
		if (pParameters == null) {
			return null;
		}

		Object item = pParameters.get(pKey);

		if (item == null) {
			return null;
		}
		if ((item instanceof String[])) {
			return ((String[])(String[])item)[0];
		}

		return (String)item;
	}


	/**
	 * Removes the cookie with pCookieName name.
	 *
	 * @param pRequest the request
	 * @param pResponse the response
	 * @param pCookieName the cookie name
	 */
	public void deleteCookie(final HttpServletRequest pRequest, final HttpServletResponse pResponse,
	                         final String pCookieName) {
		Cookie cookies[] = pRequest.getCookies();
		if (cookies != null) {
			for (int i = 0; i < cookies.length; i++) {
				if (cookies[i].getName().trim().equals(pCookieName)) {
					cookies[i].setValue(null);
					cookies[i].setMaxAge(0);
					cookies[i].setPath(getCookiePath());
					cookies[i].setVersion(0);
					cookies[i].setSecure(false);
					System.out.println("i = " + i);
					if (getCookieDomain() != null) {
						cookies[i].setDomain(getCookieDomain());
					}
					pResponse.addCookie(cookies[i]);
					break;
				}
			}
		}
		if (isClearCookiesWithObsoleteDomain()) {
			deleteObsoleteCookie(pResponse, pCookieName);
		}
	}

	/**
	 * Delete obsolete cookie.
	 *
	 * @param pResponse the response
	 * @param pCookieName the cookie name
	 */
	protected void deleteObsoleteCookie(final HttpServletResponse pResponse, final String pCookieName) {
		Cookie cookie = createCookie(pCookieName, null, 0);
		cookie.setDomain(getObsoleteCookieDomain());
		pResponse.addCookie(cookie);
	}

	/**
	 * Returns the mMaxSize property
	 */
	public int getMaxSize() {
		return mMaxSize;
	}

	/**
	 * Sets the mMaxSize property
	 */
	public void setMaxSize(final int pMaxSize) {
		mMaxSize = pMaxSize;
	}

	/**
	 * Returns the mCookieLiveTime property
	 */
	public int getCookieLiveTime() {
		return mCookieLiveTime;
	}

	/**
	 * Sets the mCookieLiveTime property
	 */
	public void setCookieLiveTime(final int pCookieLiveTime) {
		mCookieLiveTime = pCookieLiveTime;
	}

	/**
	 * Returns the mCookiePath property
	 */
	public String getCookiePath() {
		return mCookiePath;
	}

	/**
	 * Sets the mCookiePath property
	 */
	public void setCookiePath(final String pCookiePath) {
		mCookiePath = pCookiePath;
	}

	/**
	 * @return the mCookieDomain
	 */
	public String getCookieDomain() {
		return mCookieDomain;
	}

	/**
	 * @param pCookieDomain the mCookieDomain to set
	 */
	public void setCookieDomain(String pCookieDomain) {
		mCookieDomain = pCookieDomain;
	}

	/**
	 * Checks if is clear cookies with obsolete domain.
	 *
	 * @return true, if is clear cookies with obsolete domain
	 */
	public boolean isClearCookiesWithObsoleteDomain() {
		return mClearCookiesWithObsoleteDomain;
	}

	/**
	 * Sets the clear cookies with obsolete domain.
	 *
	 * @param pClearCookiesWithObsoleteDomain the new clear cookies with obsolete domain
	 */
	public void setClearCookiesWithObsoleteDomain(boolean pClearCookiesWithObsoleteDomain) {
		mClearCookiesWithObsoleteDomain = pClearCookiesWithObsoleteDomain;
	}

	/**
	 * Gets the obsolete cookie domain.
	 *
	 * @return the obsolete cookie domain
	 */
	public String getObsoleteCookieDomain() {
		return mObsoleteCookieDomain;
	}

	/**
	 * Sets the obsolete cookie domain.
	 *
	 * @param pObsoleteCookieDomain the new obsolete cookie domain
	 */
	public void setObsoleteCookieDomain(String pObsoleteCookieDomain) {
		mObsoleteCookieDomain = pObsoleteCookieDomain;
	}
}
